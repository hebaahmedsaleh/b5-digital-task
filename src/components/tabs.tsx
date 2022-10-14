import React from 'react';
import styled from 'styled-components';
import { colors } from './color';

const StyledTab = styled.div`
  display: flex;
  color: #${colors.greyText};
  &:focus,
  &:first-child {
    border-bottom: 1px solid ${colors.lightText};
    color: #11142d;
    margin-bottom: -1px;

    & > p {
      font-weight: bold;
    }
  }
`;

const TabsContainer = styled.div`
display: flex;
margin: 32px 54px;
justify-content: space-between;
border-bottom: 1px solid #F2F0FF;

}`;

const Tabs = () => {
  const tabsTitles = ['All', 'Food', 'Drinks', 'Snacks', 'Packages'];
  return (
    <TabsContainer>
      {tabsTitles.map((elem) => {
        return (
          <StyledTab key={elem}>
            <p style={{ padding: 10 }}>{elem} </p>
          </StyledTab>
        );
      })}
    </TabsContainer>
  );
};

export default Tabs;
