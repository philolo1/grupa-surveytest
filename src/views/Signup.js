import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Page from '../components/Page';

const ErrorToast = styled.div`
  //background: #d8f0ea;
  background: white;
  border-radius: 5px;
  height: 60px;
  width: 345px;
  margin-bottom: 24px;
`;

const Logo = styled.div`
  color: rgb(73, 73, 73);
  font-size: 46px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 53px;
`;

const Title = styled.div`
  font-weight: 800;
  color: rgb(64, 64, 64);
  font-size: 26px;
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  width: 100%;
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
  background: #22b394;
  border-radius: 25px;

  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  outline: none;
`;

const InfoText = styled.div`
  color: rgb(64, 64, 64);
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 13px;
`;

const LinkText = styled(Link)`
  color: rgb(34, 179, 148);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin-bottom: 50px;
`;

const SignupPage = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Too Short').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required'),
    }),
    onSubmit: (values) => {
      history.replace('/list');
    },
  });

  const handleClick = async () => {
    const values = formik.values;
    const schema = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Too Short').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required'),
    });
    const valid = await schema.isValid(values);
    if (!valid) alert(JSON.stringify(formik.errors));
  };

  return (
    <Page>
      <ErrorToast />
      <Logo>Grupa</Logo>
      <Title>Sign up</Title>

      <Form onSubmit={formik.handleSubmit}>
        <Field>
          <label htmlFor="name">User name</label>

          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Enter your name"
          />
        </Field>

        <Field>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="example@site.com"
          />
        </Field>

        <Field>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter your password"
          />
        </Field>

        <Field>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Confirm password"
          />
        </Field>

        <Button onClick={() => handleClick()} type="submit">
          Create account
        </Button>
      </Form>

      <InfoText>Already have an account?</InfoText>
      <LinkText to="/login">Login</LinkText>
    </Page>
  );
};

export default SignupPage;
