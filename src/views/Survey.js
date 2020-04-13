import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { Box, Row } from '../components/Box';
import BackRow from '../components/BackRow';
import BigButton from '../components/button/BigButton';
import Page from '../components/Page';
import SmallButton from '../components/button/SmallButton';

const SelectIcon = styled.img`
  margin-right: 10px;
  height: 24px;
  width: 24px;
`;

const ChoiceRow = styled(Row)`
  :hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
`;

const Answer = styled.div`
  color: rgb(64, 64, 64);
  font-size: 16px;
`;

const BottomRow = styled(Row)`
  justify-content: center;
  align-items: center;
  border-top: 1px solid #d1d1d1;
`;

const NextButton = styled.div`
  opacity: ${props => (props.isDiabled ? '0.5' : '1')};
  background: #22b394;
  font-size: 16px;
  line-height: 16px;
  color: white;
  font-weight: bold;
  background: #22b394;
  border-radius: 25px;
  height: 40px;
  width: 93px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

const PageInfoText = styled.div`
  font-size: 16px;
  color: #22b394;
  font-weight: bold;
`;

const Title = styled.div`
  color: rgb(64, 64, 64);
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  margin-right: 15px;
  margin-left: 15px;
`;

const QuestionTitle = styled.div`
  color: rgb(64, 64, 64);
  font-size: 36px;
  font-weight: 900;
  text-align: left;
  padding-left: 15px;
  margin-bottom: 20px;
  padding-top: 26px;
`;

const Caption = styled.div`
  color: rgb(64, 64, 64);
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  text-align: center;
  margin-top: 30px;
  margin-right: 15px;
  margin-left: 15px;
`;
const WelcomeSurvey = ({ mainSurvey, user, id, history, survey }) => {
  return (
    <Page history={history}>
      <BackRow
        onClick={() => {
          history.goBack();
        }}
        text="Back to Surveys"
      />
      {survey !== null ? (
        <Box>
          <Row w100 mt={69} mb={37}>
            <Box f1 />
            <div style={{ fontSize: 110 }}>{survey.icon}</div>
            <Box f1 />
          </Row>
          <Title>{survey.title}</Title>
          <Caption>{survey.desc}</Caption>
          <Box h={65} />
          {user.answeredIds.indexOf(id) == -1 ? (
            <BigButton
              onClick={() => {
                history.push(`/survey/${id}/1`);
              }}
              text="Start"
            >
              Start
            </BigButton>
          ) : null}
          <Row mr={30} mb={20} ml={11} mt={20} style={{ flexWrap: 'wrap' }}>
            {user.isAdmin ? (
              <>
                <SmallButton
                  onClick={() => {
                    history.push(`/results/${id}`);
                  }}
                  text="Show results"
                />
                <SmallButton
                  onClick={() => {
                    mainSurvey.cancel(id);
                    history.push(`/lists`);
                  }}
                  text="Close survey"
                />
              </>
            ) : (
              <>
                <Box f1 />
                <SmallButton
                  onClick={() => {
                    history.push(`/results/${id}`);
                  }}
                  text="Show results"
                />
                <Box f1 />
              </>
            )}
          </Row>
        </Box>
      ) : null}
    </Page>
  );
};

const FinishSurvey = ({ id, history, survey }) => {
  return (
    <Page history={history}>
      {survey !== null ? (
        <Box f1>
          <Box f1 />
          <Row w100 mt={69} mb={37}>
            <Box f1 />
            <div style={{ fontSize: 110 }}>{survey.icon}</div>
            <Box f1 />
          </Row>
          <Title>Done</Title>
          <Caption>Survey completed!</Caption>
          <Box f1 />
          <BigButton
            onClick={() => {
              history.push(`/`);
            }}
            text="Close"
          />
          <Row mr={30} ml={11} mb={60} mt={20} style={{ flexWrap: 'wrap' }}>
            <Box f1 />
            <SmallButton
              onClick={() => {
                history.push(`/results/${id}`);
              }}
              text="Show results"
            />
            <Box f1 />
          </Row>
        </Box>
      ) : null}
    </Page>
  );
};

const Choice = ({ text, onClick, isSelected }) => {
  return (
    <ChoiceRow onClick={onClick} ml={15} mb={14}>
      <SelectIcon
        src={
          isSelected
            ? require('../assets/choiceSelected.svg')
            : require('../assets/choiceUnSelected.svg')
        }
      />
      <Answer>{text}</Answer>
    </ChoiceRow>
  );
};

const AskSurvey = ({ id, page, history, survey, mainSurvey }) => {
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAnswer('');
  }, [page]);

  if (survey === null) return <Page />;
  const question = survey.questions[page - 1];

  return (
    <Page history={history}>
      <QuestionTitle>{question.question}</QuestionTitle>
      {question.answers.map(e => (
        <Choice
          isSelected={e === answer}
          onClick={() => {
            setAnswer(e);
          }}
          key={e}
          text={e}
        />
      ))}
      <Box f1 />
      <BottomRow pr={15} pl={15} h={60}>
        <PageInfoText>
          {page}/{survey.questions.length}
        </PageInfoText>
        <Box f1 red />
        <NextButton
          isDiabled={answer === ''}
          onClick={
            answer === ''
              ? null
              : () => {
                  if (page < survey.questions.length) {
                    history.push(`/survey/${id}/${parseInt(page) + 1}`);
                    const myAnswers = answers.map(e => e);
                    myAnswers.push({
                      id: question.id,
                      value: answer
                    });

                    setAnswers(myAnswers);
                  } else {
                    const myAnswers = answers.map(e => e);
                    myAnswers.push({
                      id: question.id,
                      value: answer
                    });
                    mainSurvey.answer(id, myAnswers);

                    history.push(`/survey/${id}/finish`);
                  }
                }
          }
        >
          {page < survey.questions.length ? 'Next' : 'Finish'}
        </NextButton>
      </BottomRow>
    </Page>
  );
};

export default inject('survey', 'user')(
  observer(({ survey, history, user }) => {
    const { id, page } = useParams();
    useEffect(() => {
      survey.get(id);
    }, [survey, id]);

    const s = survey.currentSurvey;
    if (s !== null && id !== s.id) {
      return <Page>Loading...</Page>;
    }

    if (page === undefined) {
      return (
        <WelcomeSurvey
          mainSurvey={survey}
          user={user}
          survey={s}
          history={history}
          id={id}
        />
      );
    } else if (page === 'finish') {
      return <FinishSurvey survey={s} history={history} id={id} />;
    } else {
      return (
        <AskSurvey
          mainSurvey={survey}
          page={page}
          survey={s}
          history={history}
          id={id}
        />
      );
    }
  })
);
