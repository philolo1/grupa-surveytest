import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

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
import { inject } from 'mobx-react';

const Login = ({ auth }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Too Short')
        .required('Password is required')
    }),
    onSubmit: values => {
      auth.login(values.email, values.password).catch(err => {
        //handle err
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${err}`
        });
      });
    }
  });

  window.formik = formik;

  const handleClick = () => {
    formik.validateForm().then(res => {
      if (Object.values(res).length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: Object.values(res).join('<br />')
        });
      }
    });
  };

  return (
    <Page>
      <ErrorToast />
      <Logo>Grupa</Logo>
      <Title>Sign in</Title>

      <Form onSubmit={formik.handleSubmit}>
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

        <Button onClick={() => handleClick()} type="submit">
          Sign in
        </Button>
      </Form>

      <InfoText>Do not have an account?</InfoText>
      <LinkText to="/signup">Create account</LinkText>
    </Page>
  );
};

export default inject('auth')(Login);
