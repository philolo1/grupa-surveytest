import { inject } from 'mobx-react';
import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import {
  Button,
  ErrorToast,
  Field,
  Form,
  InfoText,
  LinkText,
  Logo,
  Title,
} from '../components/signup/styles';
import Page from '../components/Page';
import errorAlert from '../tools/errorAlert';

const Login = ({ auth }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Too Short')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      auth.login(values.email, values.password).catch((err) => {
        //handle err
        errorAlert(`${err}`);
      });
    },
  });

  window.formik = formik;

  const handleClick = () => {
    formik.validateForm().then((res) => {
      if (Object.values(res).length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: Object.values(res).join('<br />'),
        });
      }
    });
  };

  return (
    <Page>
      <div className="animated fadeInUp delay-1s">
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LinkText to="/signup">Create account</LinkText>
        </div>
      </div>
    </Page>
  );
};

export default inject('auth')(Login);
