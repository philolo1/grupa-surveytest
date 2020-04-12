import { useFormik } from 'formik';
import React from 'react';
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
import { inject } from 'mobx-react';

const Login = ({ auth }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Too Short').required('Required'),
    }),
    onSubmit: (values) => {
      auth.login(values.email, values.password).catch(err => {
        //handle err
        alert(`Error happened: ${err}`)
      });
    },
  });

  const handleClick = async () => {
    const values = formik.values;
    const schema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Too Short').required('Required'),
    });
    const valid = await schema.isValid(values);
    if (!valid) alert(JSON.stringify(formik.errors));
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
