import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TimeImg from '../../assets/time.svg';
import { inject, observer } from 'mobx-react';

const ListBox = styled.div`
  padding-top: 25px;
  // height: 241px;
  padding-right: 16px;
  padding-left: 15px;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  color: rgb(64, 64, 64);
  font-family: 'Work Sans';
  font-size: 26px;
  font-weight: 800;
  // height: 30px;
  // width: 100%;
  padding-bottom: 19px;
`;
const SubTitle = styled.div`
  display: flex;
  flex: 1;
  color: rgb(64, 64, 64);
  font-size: 16px;
  font-weight: normal;
  // height: 19px;
  padding-bottom: 19px;
`;
const QText = styled.div`
  display: flex;
  flex: 1;
  color: rgb(172, 172, 172);
  font-size: 16px;
  font-weight: normal;
`;
const PostIcon = styled.img`
  height: 15px;
  width: 15px;
  margin-top: 2px;
  margin-right: 8px;
  border-radius: 15px;
`;

const CompletedButton = styled.div`
  display: flex;
  flex: 1;
  background: rgb(34, 179, 148);
  border-radius: 3px;
  height: 26px;
  max-width: 87px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  justify-content: center;
  align-items: center;
  // margin-top: 20px;
`;

const MyBorder = styled.div`
  display: flex;
  flex: 1;
  border-bottom: solid 1px rgb(231, 231, 231);
  padding-top: 24px;
`;
const Row = styled.div`
  display: flex;
`;
const IconRow = styled(Row)`
  align-items: center;
  padding-bottom: 5px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Space = styled.div`
  display: flex;
  flex: 1;
`;

const DateString = styled.div`
  color: #acacac;
  font-size: 16px;
`;

export default inject('user')(
  observer(({ survey, user }) => (
    <>
      <ListBox>
        <Link to={`/survey/${survey.uid}`} style={{ textDecoration: 'none' }}>
          <Column>
            <IconRow>
              <div style={{ fontSize: 36 }}>{survey.icon}</div>
              <Space />
              {user.answeredIds.indexOf(survey.uid) !== -1 ? (
                <CompletedButton>Completed</CompletedButton>
              ) : (
                <div />
              )}
            </IconRow>
            <Title>{survey.title}</Title>
            <SubTitle>{survey.desc}</SubTitle>
            <Row>
              <QText>{survey.numberOfQuestions} questions</QText>
              <Space />
              <PostIcon src={TimeImg} />
              <DateString>
                {new Date(survey.expiresAt).toDateString()}
              </DateString>
            </Row>
          </Column>
        </Link>
      </ListBox>
      <MyBorder />
    </>
  ))
);
