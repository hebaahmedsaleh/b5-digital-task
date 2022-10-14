import React from 'react';
import styled from 'styled-components';

import analytics from './icons/analytics.svg';
import customer from './icons/customer.png';
import dashboard from './icons/dashboard.svg';
import employee from './icons/employee.svg';
import product from './icons/product.svg';
import copoun from './icons/copoun.svg';
import settings from './icons/settings.svg';

import { colors } from './color';

const StyledNavBar = styled.nav`
  background: ${colors.white};
  position: fixed;
  width: 112px;
  height: 100%;
  top: 0px;
  bottom: 0px;
  left: 0;
  border-right: 1px solid #e1e1e1;
  padding-top: 100px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 992px) {
    width: 80px;
  }
`;

const StyledIcon = styled.a`
  padding: 16px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 16px;
  border-radius: 8px;

  @media (max-width: 992px) {
    margin: 10px;
    padding: 8px;
  }

  &.selected,
  &:hover,
  &:focus,
  &:active {
    background-color: ${colors.lightText};
    color: white;
    fill: white;
  }
`;

const StyledImg = styled.img`
  width: 24px;
  height: 24px;
  @media (max-width: 992px) {
    width: 12px;
    height: 12px;
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar>
      <div>
        <StyledIcon href='#' className='selected'>
          <StyledImg src={dashboard} style={{ backgroundColor: 'grey' }} />
        </StyledIcon>
        <StyledIcon href='#'>
          <StyledImg src={customer} />
        </StyledIcon>
        <StyledIcon href='#'>
          <StyledImg src={analytics} />
        </StyledIcon>

        <StyledIcon href='#'>
          <StyledImg src={product} />
        </StyledIcon>

        <StyledIcon href='#'>
          <StyledImg src={employee} />
        </StyledIcon>

        <StyledIcon href='#'>
          <StyledImg src={copoun} />
        </StyledIcon>
      </div>

      <div style={{ flex: 1 }} />
      <div>
        <StyledIcon href='#'>
          <StyledImg src={settings} />
        </StyledIcon>
      </div>
    </StyledNavBar>
  );
};

export default NavBar;
