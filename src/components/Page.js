import React, { Component } from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Inner = styled.div`
  max-width: 400px;
`;

class Page extends Component {
  render() {
    return (
      <Outer>
        <Inner>{this.props.children}</Inner>
      </Outer>
    );
  }
}
export default Page;
