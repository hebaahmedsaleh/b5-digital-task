import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from './header';
import NavBar from './nav-bar';
import Content from './content';
import styles from './main.module.css';

import Loading from './loading';
import { API_URL, ITEMS_PER_PAGE, TOTAL_NO_PHOTOS } from './constants';

import { Photo, Props } from 'types';

const RenderStateContainer: FC<Props> = ({ children }) => {
  return <div className={styles.loading}>{children}</div>;
};

const fetchData = async (page: number) => {
  const photos = await fetch(`${API_URL}/photos?_page=${page}&_limit=${ITEMS_PER_PAGE}`);
  if (!photos.ok) {
    throw Error(photos.statusText);
  }
  const photosJson = await photos.json();

  return photosJson;
};

const Container = styled.div`
  display: flex;
  padding: 40px 32px;
  margin-left: 90px;
  margin-top: 100px;

  background-color: #f7f7fc;
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 20px 16px;
    margin-left: 60px;
    margin-top: 80px;
  }
`;

export const App = () => {
  const [photos, setphotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<Error>();

  const { goTo, currentPage } = usePagination();

  /* - Make http requests to https://jsonplaceholder.typicode.com/posts & 
      https://jsonplaceholder.typicode.com/users
      handle Error and Loading States 
    */
  useEffect(() => {
    setIsLoading(true);

    fetchData(currentPage)
      .then((result) => setphotos(result))
      .catch((error) => setHasError(error))
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const handlePageChange = (selected: number) => goTo(selected);

  if (isLoading)
    return (
      <RenderStateContainer>
        <Loading />
      </RenderStateContainer>
    );

  if (!isLoading && !photos.length && !hasError)
    return (
      <RenderStateContainer>
        <h1> There is no photos yet.</h1>
      </RenderStateContainer>
    );

  if (hasError)
    return (
      <RenderStateContainer>
        <h1> There is an error in getting data.</h1>
      </RenderStateContainer>
    );
  return (
    <>
      <Header />
      <NavBar />

      <Container>
        <Content />

        <Pagination
          onChange={handlePageChange}
          pageSize={ITEMS_PER_PAGE}
          total={TOTAL_NO_PHOTOS}
          hideOnSinglePage
          showPrevNextJumpers
          current={currentPage}
        />
      </Container>
    </>
  );
};
