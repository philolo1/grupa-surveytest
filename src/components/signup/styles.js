import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ErrorToast = styled.div`
  //background: #d8f0ea;
  background: white;
  border-radius: 5px;
  height: 60px;
  width: 345px;
  margin-bottom: 24px;
`;

export const Logo = styled.div`
  color: rgb(73, 73, 73);
  font-size: 46px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 53px;
`;

export const Title = styled.div`
  font-weight: 800;
  color: rgb(64, 64, 64);
  font-size: 26px;
  text-align: center;
  margin-bottom: 24px;
`;

export const HeaderTitle = styled.div`
  color: rgb(73, 73, 73);
  font-family: WorkSans-Black;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const CategoryTitle = styled(HeaderTitle)`
  color: rgb(64, 64, 64);
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  padding-top: 31px;
  padding-bottom: 24px;
`;


export const TitleLeft = styled(Title)`
  text-align: left;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const Field = styled.div`
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

export const Button = styled.button`
  width: 345px;
  height: 50px;
  background: #22b394;
  border-radius: 25px;

  border: 0;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  outline: none;
`;

export const SmallButton = styled(Button)`
  color: white;
  height: 40px;
  width: 93px;
`

export const InfoText = styled.div`
  color: rgb(64, 64, 64);
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 13px;
`;

export const LinkText = styled(Link)`
  color: rgb(34, 179, 148);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin-bottom: 50px;
`;

export const Row = styled.div`
  display: flex;
`;

export const MyRow = styled(Row)`
  // width: 100%;
  // background-color: pink;
  padding-right: 16px;
  padding-left: 15px;
`;

export const Space = styled.div`
  display: flex;
  flex: 1;
`;
