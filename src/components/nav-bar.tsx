import { FC } from 'react';
import styled from 'styled-components';

import { colors } from './color';
import { useLocation } from 'react-router-dom';

const StyledNavBar = styled.nav`
  background: ${colors.white};
  position: fixed;
  width: 300px;
  height: 100%;
  top: 0px;
  bottom: 0px;
  left: 0;
  border-right: 1px solid #e1e1e1;
  padding-top: 100px;
  overflow-x: scroll;
  @media (max-width: 992px) {
    width: 80px;
  }
`;

const StyledIcon = styled.a`
  font-size: 14px;
  display: flex;
  padding: 16px 45px 8px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: ${colors.green};
  @media (max-width: 992px) {
    margin: 10px;
    padding: 8px;
  }

  &.selected,
  &:hover,
  &:focus,
  &:active {
    background-color: ${colors.black};
    color: white;
    fill: white;
  }
`;

const NavBar = ({ categories }: { categories: string[] }) => {
  const location = useLocation();

  return (
    <StyledNavBar>
      {categories?.map((category) => {
        return (
          <StyledIcon
            href={`/${category}`}
            key={category}
            className={location.pathname.slice(1) === category ? 'selected' : ''}
          >
            {category}
          </StyledIcon>
        );
      })}
    </StyledNavBar>
  );
};

export default NavBar;
