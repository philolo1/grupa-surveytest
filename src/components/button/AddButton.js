import React from 'react'
import styled from 'styled-components';

const AddButtonBackground = styled.div`
  align-items: center;
  background: rgb(34, 179, 148);
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
`;

export default (props) => (
  <AddButtonBackground {...props}>
    <div
      style={{
        color: 'white',
        fontSize: '27px',
        fontWeight: 500,
        lineHeight: '27px'
      }}
    >＋</div>
  </AddButtonBackground>
)

