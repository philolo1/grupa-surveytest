import React from 'react';
import { useFormik } from 'formik';
import { inject } from 'mobx-react';
import * as Yup from 'yup';

import {
  Button,
  ErrorToast,
  Field,
  Form,
  InfoText,
  LinkText,
  Logo,
  Title
} from '../components/signup/styles';
import Page from '../components/Page';

const SignupPage = ({ auth, history }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Too Short')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required')
    }),
    onSubmit: values => {
      auth
        .signup(values.email, values.password, values.name)
        .catch(err => {
          //handle err
          console.log('signup page error:', err);
        })
        .then(e => {
          history.push('/');
        });
    }
  });

  const handleClick = async () => {
    const values = formik.values;
    const schema = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Too Short')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required')
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

export default inject('auth')(SignupPage);
