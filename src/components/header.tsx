import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import avatar from './icons/ic-actions-user.svg';
import cart from './icons/ic-ecommerce-basket.svg';
import Search from './icons/search.svg';
import { colors } from './color';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from './constants';
import { CartContext } from 'cart-context';

const StyledHeader = styled.header`
  background: ${colors.white};
  position: fixed;
  width: 100%;
  height: 103px;
  left: 0px;
  top: 0px;
  z-index: 1;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 45px;
`;

const StyledAvatar = styled.div`
  display: flex;
  cursor: pointer;

  & > div {
    width: 125px;
    margin-left: 16px;
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

const Header = ({ categories }: { categories: string[] }) => {
  const navigate = useNavigate();
  const [, setSearch] = useState('');
  const [, setSearchParams] = useSearchParams();

  const { cartItems } = useContext(CartContext);

  const onChange = (e: any) => {
    navigate(`/${e.target?.value}`);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      setSearchParams({ q: event.target?.value });
    }
  };
  return (
    <StyledHeader>
      <StyledAvatar style={{ alignItems: 'center' }}>
        <p style={{ color: colors.mainText, fontSize: 30, fontWeight: 'bolder' }}> Freshnesecom </p>
      </StyledAvatar>

      <div style={{ position: 'relative' }}>
        <select onChange={onChange}>
          <option key='All' value='All'>
            All
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <StyledSearchInput
          type='text'
          placeholder='Search Here..'
          name='search'
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <StyledSearchIcon src={Search} />
      </div>

      <StyledAvatar>
        <img src={avatar} width={24} height={24} style={{ marginRight: 40 }} />

        <img src={cart} width={24} height={24} style={{ marginRight: 8 }} />
        {cartItems}
      </StyledAvatar>
    </StyledHeader>
  );
};

export default Header;
