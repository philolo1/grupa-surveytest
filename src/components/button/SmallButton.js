import React from 'react';
import styled from 'styled-components';

const SmallButtonStyled = styled.div`
  border: 1px solid #22b394;
  border-radius: 25px;
  font-family: SFProDisplay-Bold;
  font-size: 16px;
  line-height: 16px;
  color: #22b394;
  text-align: center;
  height: 40px;
  width: 140px;
  margin-left: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({ onClick, text, props }) => (
  <SmallButtonStyled onClick={onClick} {...props}>
    <div>{text}</div>
  </SmallButtonStyled>
);
