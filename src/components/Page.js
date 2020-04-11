import React, { Component } from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

class Page extends Component {
  render() {
    return <Outer>{this.props.children}</Outer>;
  }
}
export default Page;
