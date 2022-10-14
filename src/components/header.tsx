import React from 'react';
import styled from 'styled-components';

import avatar from './icons/avatar.png';
import notification from './icons/notification.png';
import logo from './icons/logo.png';
import { colors } from './color';

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
  padding: 20px 32px;
`;

const StyledAvatar = styled.div`
  display: flex;

  & > div {
    width: 125px;
    margin-left: 16px;
  }
`;
const Header = () => {
  return (
    <StyledHeader>
      <StyledAvatar style={{ alignItems: 'center' }}>
        {/* <img src={logo} width={40} height={40} style={{ marginRight: 8 }} /> */}
        <p style={{ color: '#11142D' }}> Dazboard </p>
      </StyledAvatar>

      <StyledAvatar>
        {/* <img src={notification} width={40} height={40} style={{ marginRight: 8 }} />

        <img src={avatar} width={40} height={40} style={{ marginRight: 8 }} /> */}

        <div>
          <p style={{ color: '#11142D', opacity: 0.2, paddingBottom: 6 }}> Sumantu </p>
          <p style={{ fontSize: 12, color: '#9A9AB0' }}> Cashier </p>
        </div>
      </StyledAvatar>
    </StyledHeader>
  );
};

export default Header;
