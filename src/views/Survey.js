import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Box, Row } from '../components/Box';
import { Button } from '../components/signup/styles';

import BigButton from '../components/button/BigButton';
import SmallButton from '../components/button/SmallButton';
import Page from '../components/Page';

const BottomRow = styled(Row)`
  justify-content: center;
  align-items: center;
  border-top: 1px solid #d1d1d1;
`;

const NextButton = styled.div`
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

const BackRow = styled.div`
  display: flex;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  color: rgb(64, 64, 64);
  font-size: 36px;
  font-weight: 900;
  text-align: center;
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
`;
const BackRowText = styled.div`
  height: 47px;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  color: rgb(34, 179, 148);
  align-items: center;
  flex: 1;
  border: 1px solid rgb(242, 242, 242);
  padding-left: 15px;
`;

const ChevronContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 0px;
  border: 1px solid rgb(242, 242, 242);
  height: 47px;
  width: 40px;
`;

const WelcomeSurvey = ({ id, history, survey }) => {
  return (
    <Page>
      <BackRow
        onClick={() => {
          history.goBack();
        }}
      >
        <ChevronContainer>
          <img alt="chevronLeft" src={require('../assets/chevronLeft.svg')} />
        </ChevronContainer>
        <BackRowText>Back to Surveys</BackRowText>
      </BackRow>
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
          <BigButton
            onClick={() => {
              history.push(`/survey/${id}/1`);
            }}
            text="Start"
          >
            Start
          </BigButton>
          <Row mr={30} ml={11} mt={20} style={{ flexWrap: 'wrap' }}>
            <SmallButton
              onClick={() => {
                history.push(`/results/${id}`);
              }}
              text="Show results"
            />
            <SmallButton
              onClick={() => {
                alert('close survey');
                // history.push(`/results/${id}`);
              }}
              text="Close survey"
            />
          </Row>
        </Box>
      ) : null}
    </Page>
  );
};

const FinishSurvey = ({ id, history, survey }) => {
  return (
    <Page>
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

const AskSurvey = ({ id, page, history, survey }) => {
  if (survey === null) return <Page />;
  const question = survey.questions[page - 1];

  console.log('survey', JSON.stringify(survey.questions[page - 1]));
  return (
    <Page>
      <QuestionTitle>{question.question}</QuestionTitle>
      <Box f1 />
      <BottomRow pr={15} pl={15} h={60}>
        <PageInfoText>
          {page}/{survey.questions.length}
        </PageInfoText>
        <Box f1 red />
        <NextButton
          onClick={() => {
            if (page < survey.questions.length) {
              history.push(`/survey/${id}/${parseInt(page) + 1}`);
            } else {
              history.push(`/survey/${id}/finish`);
            }
          }}
        >
          {page < survey.questions.length ? 'Next' : 'Finish'}
        </NextButton>
      </BottomRow>
    </Page>
  );
};

export default inject('survey')(
  observer(({ survey, history }) => {
    useEffect(() => {
      survey.get(id);
    }, []);

    const { id, page } = useParams();
    const s = survey.currentSurvey;
    console.log('page', page);
    //let linkText
    let element;
    if (page === undefined) {
      return <WelcomeSurvey survey={s} history={history} id={id} />;
    } else if (page === 'finish') {
      return <FinishSurvey survey={s} history={history} id={id} />;
      element = <Link to={`/`}>Finish</Link>;
    } else {
      return <AskSurvey page={page} survey={s} history={history} id={id} />;
      /*
      element = (
        <Link to={`/survey/${id}/${parseInt(page) + 1}`}>Next Question</Link>
      );
      */
    }

    return (
      <div>
        <div>{`Survey of ${id}, page: ${page}`}</div>
        <br />
        {element}
        <br />
        <Link to={`/results/${id}`}>Results</Link>
        <Button onClick={() => survey.get(id)}>Load Survey</Button>
        {JSON.stringify(s)}
      </div>
    );
  })
);
