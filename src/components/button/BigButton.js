import React from 'react';
import styled from 'styled-components';

const BigButtonStyled = styled.div`
  background: #22b394;
  border-radius: 30px;
  font-family: SFProDisplay-Bold;
  font-size: 20px;
  line-height: 60px;
  color: white;
  text-align: center;
  margin-left: 30px;
  margin-right: 30px;
  height: 60px;
  text-decoration: none;
  :hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
  :hover {
    cursor: pointer;
  }
`;

export default ({ onClick, text, props }) => (
  <BigButtonStyled onClick={onClick} {...props}>
    <div>{text}</div>
  </BigButtonStyled>
);
