import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import { Card } from './product-card';

import { Product } from 'types';

import { API_URL, ITEMS_PER_PAGE } from './constants';

import { RenderStateContainer } from 'components';
import Loading from './loading';
import { PaginationContext } from './pagination-context';

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 24px 16px;
  flex: 6;
  @media (max-width: 992px) {
    margin-bottom: 40px;
  }
`;
let hasMore = true;

const MainContent = ({ categories }: { categories: string[] }) => {
  const [categoryProducts, setcategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setHasError] = useState<Error>();

  const location = useLocation();
  const { page, goToPage } = useContext(PaginationContext);

  // fetch data handles the search, selecting category and also show more in /product api
  const fetchData = async (page: number, categoryName: string, searchTerm?: string) => {
    setIsLoading(true);

    const skip = page > 1 ? page * ITEMS_PER_PAGE : 0;
    let resultQuery = '';
    const params: { skip?: number; limit?: number; q?: string } = {
      skip,
      limit: ITEMS_PER_PAGE,
      q: searchTerm,
    };

    (Object.keys(params) as (keyof typeof params)[]).forEach((key, index) => {
      if (index === 2) resultQuery += `${key}=${params[key]}`;
      else resultQuery += `${key}=${params[key]}&`;
    });

    let pathName = `${API_URL}products/search?${resultQuery}`;

    if (categoryName && categoryName !== 'All') {
      pathName = `${API_URL}products/category/${categoryName}?${resultQuery}`;
    }

    const categoryProductsResult = await fetch(pathName);

    if (!categoryProductsResult.ok) {
      throw Error(categoryProductsResult.statusText);
    }
    const categoryProductsJson = await categoryProductsResult.json();

    return categoryProductsJson;
  };

  const handleScroll = () => {
    goToPage(page + 1);
  };

  useEffect(() => {
    if (page == 1) hasMore = true;
  }, [page, location]);

  useEffect(() => {
    const filter = location.pathname.slice(1);
    const searchValue = location.search.replace('?q=', '');

    if (hasMore) {
      fetchData(page, filter, searchValue)
        .then((result) => {
          let data = result.products;
          if (page !== 1) {
            data = [...categoryProducts, ...result.products];
          }

          if (result.total <= page * ITEMS_PER_PAGE + ITEMS_PER_PAGE) {
            hasMore = false;
          }
          setcategoryProducts(data);
        })
        .catch((error) => setHasError(error))
        .finally(() => setIsLoading(false));
    }
  }, [location, page]);

  if (isLoading)
    return (
      <RenderStateContainer>
        <Loading />
      </RenderStateContainer>
    );

  // upon selecting category, api always limit 5 so no need for showing more
  if (categories.includes(location.pathname.slice(1))) {
    return (
      <StyledMain>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {categoryProducts.map((product: Product) => {
            return <Card key={product.id} {...product} />;
          })}
        </div>
      </StyledMain>
    );
  }

  return (
    <BottomScrollListener onBottom={() => handleScroll()}>
      {() => (
        <StyledMain>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {categoryProducts.map((product: Product) => {
              return <Card key={product.id} {...product} />;
            })}
          </div>
        </StyledMain>
      )}
    </BottomScrollListener>
  );
};

export default MainContent;
