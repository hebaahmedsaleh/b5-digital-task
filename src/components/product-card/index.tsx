import { FC, useContext, useState } from 'react';
import styles from './card.module.css';

import { Product } from 'types';
import styled from 'styled-components';
import { colors } from '../../color';
import { CartContext } from 'cart-context';

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  height: 48px;
  background: ${colors.green};
  bordercolor: ${colors.greenBorder};
  border-radius: 8px;
  color: white;
  cursor: pointer;
`;

const StyledIncrementBtn = styled.div`
  height: 24px;
  width: 24px;
  background-color: ${colors.greenBorder};
  border-radius: 4px;
  color: ${colors.white};
  text-align: center;
  font-weight: 700;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & .count-items {
    height: 24px;
    width: 40px;
    text-align: center;
  }
`;

export const Card: FC<Product> = ({ id, title, thumbnail, description, price }) => {
  const [count, setItemCount] = useState(0);

  const { addToCart, cartItems } = useContext(CartContext);

  const buyProduct = () => {
    setItemCount(count + 1);
    addToCart(cartItems + 1);
  };

  const removeProduct = () => {
    setItemCount(count - 1);
    cartItems && addToCart(cartItems - 1);
  };

  return (
    <div className={styles.container} key={id}>
      <img src={thumbnail} alt={thumbnail} className={styles.img} loading='lazy' />
      <div style={{ maxHeight: 80 }}>
        <p className={styles.title} title={title}>
          {title}
        </p>

        <p className={styles.description} title={description}>
          {description}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 'bold' }}> {price}USD</p>

        {count ? (
          <StyledContainer>
            <StyledIncrementBtn onClick={removeProduct}> - </StyledIncrementBtn>
            <div className='count-items'> {count} </div>
            <StyledIncrementBtn onClick={buyProduct}> + </StyledIncrementBtn>
          </StyledContainer>
        ) : (
          <StyledButton onClick={buyProduct}> Buy now </StyledButton>
        )}
      </div>
    </div>
  );
};
