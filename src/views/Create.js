import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { TitleLeft, Form, Field, SmallButton } from '../components/signup/styles';
import styled from 'styled-components';

const Informations = ({ onValidate }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      icon: '😃',
      timeLimit: 0
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      desc: Yup.string().required('Required'),
      icon: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      onValidate(values)
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
    <div>
      <TitleLeft>Create Survey</TitleLeft>
      <div>Please enter a title, description. Then select an icon and choose to add a time limit or not.</div>
      <Form onSubmit={formik.handleSubmit}>
      <Field>
          <label htmlFor="title">Title</label>

          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            placeholder="Enter title"
          />
        </Field>
        <Field>
          <label htmlFor="desc">Description</label>

          <textarea
            id="desc"
            name="desc"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.desc}
            placeholder="Enter description"
          />
        </Field>
        <Field>
          <label htmlFor="icon">Icon</label>

          <EmojiField selected={formik.values.icon} onChange={v => formik.setFieldValue('icon', v)} />
        </Field>
        <Footer>
          <div>1/2</div>
          <SmallButton onClick={() => handleClick()} type="submit">
            Next
          </SmallButton>
        </Footer>
      </Form>

  </div>
  )
}

const Footer = styled.div`
  align-items: center;
  border-top: 1px grey solid;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  padding: 0 15px;
  position: absolute;
  width: 100%;
`

const EmojiField = ({selected = '😃' , onChange}) => {
  const [open, setOpen] = useState(false)

  const handleEmojiClicked = (e, emojiObject) => {
    setOpen(false)
    onChange(emojiObject.emoji)
  }

  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        <Emoji>{selected}</Emoji>
      </div>
      {open ? <Modal><EmojiPicker onEmojiClick={handleEmojiClicked} /></Modal> : null}
    </div>
  )
}

const Modal = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`
/*
const Emoji = ({ id }) => (
  <aside className='emoji-picker-react'>
    <div className='emoji-group'>
      <div className='emoji'>
        <button>
          <img className='emoji-img' alt={id} href={`https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-64/${id}.png`} />
        </button>
      </div>
    </div>
  </aside>
)
*/

const Emoji = styled.div`
  font-size: 24px;
  color: black;
  cursor: pointer;
`

class Create extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  } 
  handleSave = v => {
    this.props.create.setInfos(v.title, v.desc, v.icon, v.time)
  }

  render() {
    return (
      <div>
        <Informations onValidate={this.handleSave} />
      </div>
    )
  }
}

export default inject('create')(observer(Create))
