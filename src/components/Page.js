import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { HeaderTitle, MyRow, Space } from './signup/styles';

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

const UserIcon = styled.img`
  width: 18px;
  height: 18px;
  background-color: pink;
  margin-top: 20px;
`;

const Header = inject('auth')(({auth}) => (
  <>
    <div style={{ height: 56 }} />
    <MyRow>
      <HeaderTitle>Grupa</HeaderTitle>
      <Space />
      <UserIcon onClick={() => auth.logout()} />
    </MyRow>
  </>
))

const Page = ({ children, user }) => (
  <Outer>
    <Inner>
      {user.uid ? <Header /> : null}
      {children}
    </Inner>
  </Outer>
)

export default inject('user')(observer(Page));
