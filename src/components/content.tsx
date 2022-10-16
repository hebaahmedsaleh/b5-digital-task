import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Card } from './product-card';

import { Product } from 'types';

import { API_URL, ITEMS_PER_PAGE } from './constants';
import usePagination from 'use-pagination';

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

const fetchData = async (page: number, categoryName: string, searchTerm?: string) => {
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

  let pathName = `${API_URL}products?${resultQuery}`;

  if (categoryName && categoryName !== 'All') {
    pathName = `${API_URL}products/category/${categoryName}?${resultQuery}`;
  }

  const categoryProducts = await fetch(pathName);

  if (!categoryProducts.ok) {
    throw Error(categoryProducts.statusText);
  }
  const categoryProductsJson = await categoryProducts.json();

  return categoryProductsJson;
};

const handleScroll = (e: any) => {
  console.log('heey');
  const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  if (bottom) {
    console.log('heey');
  }
};

const MainContent = () => {
  const [categoryProducts, setcategoryProducts] = useState<Product[]>([]);
  const [, setIsLoading] = useState<boolean>(true);
  const [, setHasError] = useState<Error>();

  const location = useLocation();
  const { currentPage } = usePagination();

  useEffect(() => {
    const filter = location.pathname.slice(1);
    const searchValue = location.search.replace('?q=', '');
    fetchData(currentPage, filter, searchValue)
      .then((result) => setcategoryProducts(result.products))
      .catch((error) => setHasError(error))
      .finally(() => setIsLoading(false));
  }, [location]);

  return (
    <StyledMain onScroll={handleScroll}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {categoryProducts.map((product: Product) => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </StyledMain>
  );
};

export default MainContent;
