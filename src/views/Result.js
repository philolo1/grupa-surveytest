import React from 'react';
import { useParams } from 'react-router';

export default () => {
  const { id } = useParams();

  return (
    <div>{`Result of  ${id}`}</div>
  )
}
