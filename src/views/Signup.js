import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Page from '../components/Page';

const ErrorToast = styled.div`
  background: ${(props) => props.theme.green};
  background: white;
  border-radius: 5px;
  height: 60px;
  width: 345px;
  margin-bottom: 24px;
`;

const Logo = styled.div`
  width: 138px;
  height: 54px;
  color: rgb(73, 73, 73);
  font-size: 46px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 53px;
`;

const Title = styled.div`
  width: 95px;
  height: 30px;
  color: rgb(64, 64, 64);
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  label {
    width: 56px;
    height: 24px;
    color: rgb(64, 64, 64);
    font-size: 20px;
    font-weight: bold;
  }

  input {
    width: 330px;
    height: 40px;
    border: 0;
    outline: none;
    border-bottom: 1px solid rgb(216, 216, 216);
    font-size: 16px;
    color: rgb(145, 145, 145);
    padding-left: 15px;
  }
`;

const Button = styled.button`
  width: 345px;
  height: 50px;
  background: rgb(145, 145, 145);
  border-radius: 25px;

  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  outline: none;
`;

const InfoText = styled.div`
  width: 100%;
  height: 19px;
  color: rgb(64, 64, 64);
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 13px;
`;

const LinkText = styled(Link)`
  width: 44px;
  height: 19px;
  color: rgb(34, 179, 148);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin-bottom: 50px;
`;

export default () => (
  <Page>
    <ErrorToast />
    <Logo>Grupa</Logo>
    <Title>Sign up</Title>

    <Form action="">
      <Field>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="example@site.com" />
      </Field>

      <Field>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </Field>

      <Field>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
      </Field>

      <Button>Create account</Button>
    </Form>

    <InfoText>Already have an account?</InfoText>
    <LinkText to="/login">Login</LinkText>
  </Page>
);
