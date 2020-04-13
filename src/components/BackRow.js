import React from 'react';
import styled from 'styled-components';

const ChevronContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 0px;
  border: 1px solid rgb(242, 242, 242);
  height: 47px;
  width: 40px;
`;

const BackRowText = styled.div`
  height: 47px;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  color: rgb(34, 179, 148);
  align-items: center;
  flex: 1;
  border: 1px solid rgb(242, 242, 242);
  padding-left: 15px;
`;

const BackRowStyled = styled.div`
  display: flex;
  :hover {
    cursor: pointer;
  }
`;

const BackRow = ({ onClick, text, ...props }) => {
  return (
    <BackRowStyled onClick={onClick} {...props}>
      <ChevronContainer>
        <img alt="chevronLeft" src={require('../assets/chevronLeft.svg')} />
      </ChevronContainer>
      <BackRowText>{text}</BackRowText>
    </BackRowStyled>
  );
};

export default BackRow;
