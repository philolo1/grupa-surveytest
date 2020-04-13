import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { HeaderTitle, MyRow, Space } from './signup/styles';
import UserImg from '../assets/user@3x.png';

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 400px;
  overflow: auto;
  //padding-bottom: 60px;
  position: relative;
  width: 100%;
`;

const UserIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const RowWithShadow = styled(MyRow)`
  box-shadow: 0px 4px 2px -2px rgba(0, 0, 0, 0.13);
  margin-top: 50px;
`;

const Name = styled.div`
  margin-right: 10px;
`
const Header = inject('auth', 'user')(({ auth, history, user }) => (
  <>
    <RowWithShadow>
      <HeaderTitle>Grupa</HeaderTitle>
      <Space />
      <Name>{user.name}</Name>
      <UserIcon src={UserImg} onClick={() => {
        auth.logout()
        history.push('/')
      }} />
    </RowWithShadow>
  </>
));

const Page = ({ children, history, user }) => {
  return (
  <Outer>
    <Inner>
      {user.uid ? <Header history={history} /> : null}
      {children}
    </Inner>
  </Outer>
);
  }
export default inject('user')(observer(Page));
