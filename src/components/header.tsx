import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import avatar from './icons/ic-actions-user.svg';
import cart from './icons/ic-ecommerce-basket.svg';
import Search from './icons/search.svg';
import { colors } from './color';
import { useNavigate } from 'react-router-dom';
import { CartContext } from 'cart-context';
import { PaginationContext } from './pagination-context';

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
  right: 16px;
  height: 24px;
  width: 24px;
  transform: rotate(90deg);
`;

const StyledSearchInput = styled.input`
  display: flex;
  padding: 8px 12px;
  height: 40px;
  width: 250px;
  background: #f7f7fc;
  border: 0;

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

const StyledSelect = styled.select`
  height: 40px;
  background: #f7f7fc;
  padding: 8px 12px;
  border: 0;
  margin-right: 28px;
`;

const StyledContainer = styled.div`
  padding: 2px;
  border-radius: 8px;
  border: 1px solid ${colors.lightBorder};
`;

const StyledCartCounter = styled.p`
  background: #e5704b;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 12px;
  left: -4px;
`;

const Header = ({ categories }: { categories: string[] }) => {
  const navigate = useNavigate();
  const [, setSearch] = useState('');
  const { cartItems } = useContext(CartContext);
  const { goToPage } = useContext(PaginationContext);

  const onChange = (event: { target: { value: string } }) => {
    window.scrollTo(0, 0);
    navigate(`/${event.target?.value}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, value: string) => {
    if (event.key === 'Enter') {
      window.scrollTo(0, 0);
      goToPage(1);
      navigate(`?q=${value}`);
    }
  };

  return (
    <StyledHeader data-testid='header'>
      <StyledAvatar style={{ alignItems: 'center' }}>
        <p style={{ color: colors.mainText, fontSize: 30, fontWeight: 'bolder' }}> Freshnesecom </p>
      </StyledAvatar>

      <StyledContainer style={{ display: 'flex', backgroundColor: '#F7F7FC' }}>
        <StyledSelect onChange={onChange} defaultValue={'All'} data-testid='header-select'>
          <option key='All' value='All'>
            All Categories
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              selected={location.pathname.slice(1) === category}
            >
              {category}
            </option>
          ))}
        </StyledSelect>
        <div style={{ width: 1, backgroundColor: colors.lightBorder, margin: '4px 0' }} />
        <div style={{ position: 'relative' }}>
          <StyledSearchInput
            type='text'
            placeholder='Search Products, Categories..'
            name='search'
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e: any) => handleKeyDown(e, e.target.value)}
          />
          <StyledSearchIcon src={Search} />
        </div>
      </StyledContainer>

      <StyledAvatar>
        <img src={avatar} width={24} height={24} style={{ marginRight: 40 }} />

        <div style={{ position: 'relative', height: 46 }}>
          <img src={cart} width={24} height={24} style={{ marginRight: 8 }} />
          <StyledCartCounter>{cartItems}</StyledCartCounter>
        </div>
      </StyledAvatar>
    </StyledHeader>
  );
};

export default Header;
