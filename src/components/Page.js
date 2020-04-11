import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Outer = styled.div`
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const theme = {
  textColor: 'rgb(73, 73, 73)',
  green: 'rgb(216, 240, 234)',
  grey: 'rgb(145, 145, 145)',
  linkColor: 'rgb(34, 179, 148)',
};

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Outer>{this.props.children}</Outer>
      </ThemeProvider>
    );
  }
}
export default Page;
