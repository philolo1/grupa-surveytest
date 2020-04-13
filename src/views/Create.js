import React, { useState } from 'react';
import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import * as Yup from 'yup';
import _ from 'lodash';

import AddButton from '../components/button/AddButton';
import BackRow from '../components/BackRow';
import EmojiField from '../components/field/EmojiField';
import Page from '../components/Page';
import {
  Answers,
  TitleLeft,
  Footer,
  Field,
  SmallButton,
  MyRow,
  Button,
  Questions
} from '../components/signup/styles';

const MyField = styled(Field)`
  label {
    margin-bottom: 10px;
  }
  input,
  textarea,
  .field {
    width: auto;
  }
  textarea {
    height: 100px;
    padding: 10px 15px;
  }
`;

const MyRowTitle = styled(MyRow)`
  margin-top: 20px;
  margin-bottom: 24px;
`;

const RowWithBottomMargin = styled(MyRow)`
  margin-bottom: 30px;
`;

const Col = styled(MyRow)`
  flex-direction: column;
  align-items: stretch;
`;

const Informations = ({ init, history, onValidate }) => {
  const formik = useFormik({
    initialValues: {
      title: init.title || '',
      desc: init.desc || '',
      icon: init.icon || '😃',
      expiresAt: init.expiresAt || null
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      desc: Yup.string().required('Required'),
      icon: Yup.string().required('Required'),
      expiresAt: Yup.date().required('Required')
    }),
    onSubmit: values => {
      onValidate(values);
    }
  });

  const handleClick = async () => {
    const values = formik.values;
    const schema = Yup.object({
      title: Yup.string().required('Required'),
      desc: Yup.string().required('Required'),
      icon: Yup.string().required('Required'),
      expiresAt: Yup.date().required('Required')
    });
    const valid = await schema.isValid(values);
    if (!valid) alert(JSON.stringify(formik.errors));
  };

  return (
    <>
      <BackRow onClick={() => history.push('/list')} text='Back to Surveys' />
      <MyRowTitle>
        <TitleLeft>Create Survey</TitleLeft>
      </MyRowTitle>
      <RowWithBottomMargin>
        <div>
          Please enter a title, description. Then select an icon and choose to
          add a time limit or not.
        </div>
      </RowWithBottomMargin>
      <form onSubmit={formik.handleSubmit}>
        <Col>
          <MyField>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Enter title"
            />
          </MyField>
        </Col>
        <Col>
          <MyField>
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              name="desc"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.desc}
              placeholder="Enter description"
            />
          </MyField>
        </Col>
        <Col>
          <MyField>
            <label htmlFor="icon">Icon</label>
            <EmojiField
              selected={formik.values.icon}
              onChange={v => formik.setFieldValue('icon', v)}
            />
          </MyField>
        </Col>
        <Col>
          <MyField>
            <label htmlFor="expiresAt">Expire date</label>
            <DayPickerInput
              onDayChange={day => formik.setFieldValue('expiresAt', day)}
              value={formik.values.expiresAt}
            />
          </MyField>
        </Col>
        <Footer>
          <div>1/2</div>
          <SmallButton
            disabled={!formik.isValid || formik.values.title === ''}
            onClick={() => handleClick()}
            type="submit"
          >
            Next
          </SmallButton>
        </Footer>
      </form>
    </>
  );
};

const Question = ({ question }) => (
  <Col
    style={{
      borderBottom: '1px solid rgb(231, 231, 231)',
      paddingBottom: '15px'
    }}
  >
    <Questions>{question.question}</Questions>
    {question.answers.map((a, i) => (
      <Answers key={i}>{a}</Answers>
    ))}
  </Col>
);

const AddQuestion = inject('create')(({ create, handleBackToQuestions }) => {
  const [answers, setAnswers] = useState(['']);
  const [question, setQuestion] = useState('');

  const handleSaveQuestion = () => {
    create.addQuestion(question, formatedAnswers());
    handleBackToQuestions();
  };

  const handleReturnButtonPushed = () => {
    handleBackToQuestions()
  }

  const changeAnswers = (i, v) => {
    const a = JSON.parse(JSON.stringify(answers));
    a[0] = answers[0] || '';
    a[i] = v;
    setAnswers(a);
  };

  const formatedAnswers = () => {
    return _.uniq(_.pull(answers.slice(), '', undefined))
  }

  return (
    <>
      <BackRow onClick={handleReturnButtonPushed} text='Back to questions' />
      <MyRowTitle>
        <TitleLeft>Add question</TitleLeft>
      </MyRowTitle>
      <Col>
        <MyField>
          <label htmlFor="question">What do you what to ask?</label>
          <textarea
            name="question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </MyField>
      </Col>
      <Col>
        <MyField>
          <label htmlFor="answers">Multiple choice</label>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <input
              style={{
                display:
                  i < 2 || answers[i - 1] !== undefined ? 'block' : 'none'
              }}
              onChange={e => changeAnswers(i, e.target.value)}
              name={i}
              key={i}
              value={answers[i] || ''}
            />
          ))}
        </MyField>
      </Col>
      <Footer style={{ justifyContent: 'center' }}>
        <Button
          disabled={
            (formatedAnswers().length < 2 ) || question === ''
          }
          onClick={() => handleSaveQuestion()}
          type="submit"
        >
          Save question
        </Button>
      </Footer>
    </>
  );
});

const QuestionsView = inject('create')(
  observer(({ create, handleBackToSurvey, onValidate }) => {
    const [adding, setAdding] = useState(false);
    const q = create.questions;

    return (
      <>
        {adding ? (
          <AddQuestion handleBackToQuestions={() => setAdding(false)} />
        ) : (
          <>
            <BackRow onClick={handleBackToSurvey} text='Back to Step 1' />
            <MyRowTitle style={{ justifyContent: 'space-between' }}>
              <TitleLeft>Questions</TitleLeft>
              <AddButton onClick={() => setAdding(true)} />
            </MyRowTitle>
            {q.length > 0 ? (
              q.map((qq, i) => <Question key={i} question={qq} />)
            ) : (
              <Col
                style={{
                  alignItems: 'center',
                  fontSize: '20px',
                  justifyContent: 'center',
                  flexGrow: 1
                }}
              >
                <div>Start by creating questions</div>
                <div onClick={() => setAdding(true)} style={{ color: 'rgb(34, 179, 148)', cursor: 'pointer' }}>
                  Add first question
                </div>
              </Col>
            )}
            <Footer>
              <div>2/2</div>
              <SmallButton
                style={{ width: '142px' }}
                disabled={q.length < 1}
                onClick={() => onValidate()}
                type="submit"
              >
                Save Survey
              </SmallButton>
            </Footer>
          </>
        )}
      </>
    );
  })
);

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1
    };
    props.create.createNew();
  }

  handleInformationSave = v => {
    this.props.create.setInfos(v.title, v.desc, v.icon, v.expiresAt);
    this.setState({ page: 2 });
  };

  handleQuestionSave = () => {
    const { create, survey } = this.props;
    survey.create(create.survey, create.question).then(() => {
      this.props.history.push('/list');
    });
  };

  render() {
    return (
      <Page history={this.props.history}>
        {this.state.page === 1 ? (
          <Informations
            init={this.props.create.survey}
            history={this.props.history}
            onValidate={this.handleInformationSave}
          />
        ) : (
          <QuestionsView
            loading={this.state.loading}
            handleBackToSurvey={() => this.setState({ page: 1 })}
            onValidate={this.handleQuestionSave}
          />
        )}
      </Page>
    );
  }
}

export default inject('create', 'survey')(observer(Create));
