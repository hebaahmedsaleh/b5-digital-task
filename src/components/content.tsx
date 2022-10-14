import React from 'react';
import styled from 'styled-components';
import { Card } from './product-card';
import Tabs from './tabs';

import data from './products.json';
import { Product } from 'types';

import Search from './icons/search.svg';

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

const StyledSearchIcon = styled.img`
  margin-right: 8px;
  position: absolute;
  top: 8px;
  left: 16px;
  height: 24px;
  width: 24px;
`;

const StyledSearchInput = styled.input`
  display: flex;
  padding: 8px 48px;
  height: 40px;
  width: 100%;
  background: #f7f7fc;
  border-radius: 8px;
  border: 1px solid #000;
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    display: flex;
    align-items: center;
    letter-spacing: 0.008em;
    color: #9a9ab0;
  }
`;

const MainContent = () => {
  return (
    <StyledMain>
      <div style={{ position: 'relative' }}>
        <StyledSearchInput type='text' placeholder='Search Here..' name='search' />
        <StyledSearchIcon src={Search} />
      </div>

      <Tabs />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.products.map((product: Product) => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </StyledMain>
  );
};

export default MainContent;
