import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { HeaderTitle, MyRow, Space } from './signup/styles';

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Inner = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 400px;
  overflow: auto;
  padding-bottom: 60px;
  position: relative;
  width: 100%;
`;

const UserIcon = styled.img`
  width: 18px;
  height: 18px;
  background-color: pink;
  margin-top: 20px;
`;

const RowWithShadow = styled(MyRow)`
  box-shadow: 0px 4px 2px -2px rgba(0, 0, 0, 0.13);
`

const Header = inject('auth')(({auth}) => (
  <>
    <div style={{ height: 56 }} />
    <RowWithShadow>
      <HeaderTitle>Grupa</HeaderTitle>
      <Space />
      <UserIcon onClick={() => auth.logout()} />
    </RowWithShadow>
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
