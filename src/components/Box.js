import styled from 'styled-components';

const calculateColor = props => {
  if (props.red) {
    return `background-color: red;`;
  } else if (props.blue) {
    return `background-color: blue;`;
  } else if (props.orange) {
    return `background-color: orange;`;
  } else if (props.green) {
    return `background-color: green;`;
  } else if (props.pink) {
    return `background-color: pink;`;
  } else if (props.yellow) {
    return `background-color: yellow;`;
  }

  return null;
};

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  ${props => calculateColor(props)};
  ${props => (props.pl ? `padding-left: ${props.pl}px;` : null)};
  ${props => (props.pr ? `padding-right: ${props.pr}px;` : null)};
  ${props => (props.pt ? `padding-top: ${props.pt}px;` : null)};
  ${props => (props.pb ? `padding-bottom: ${props.pb}px;` : null)};
  ${props => (props.ml ? `margin-left: ${props.ml}px;` : null)};
  ${props => (props.mr ? `margin-right: ${props.mr}px;` : null)};
  ${props => (props.mt ? `margin-top: ${props.mt}px;` : null)};
  ${props => (props.mb ? `margin-bottom: ${props.mb}px;` : null)};
  ${props => (props.w100 ? `width: 100%;` : null)};
  ${props => (props.f1 ? `flex: 1;` : null)};
  ${props => (props.f2 ? `flex: 2;` : null)};
  ${props => (props.h ? `height: ${props.h}px;` : null)};
  ${props => (props.w ? `width: ${props.w}px;` : null)};
  ${props => (props.showBorder ? `border: 1px solid black;` : null)};
`;

export const Row = styled(Box)`
  flex-direction: row;
`;

export const Col = styled(Box)`
  flex-direction: column;
`;

export const Space = styled.div`
  width: ${props => props.w}px;
  heigh: ${props => props.h}px;
`;
