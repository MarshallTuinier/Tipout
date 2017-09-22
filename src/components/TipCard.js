import React from 'react';
import { Paper } from 'material-ui';
import styled from 'styled-components';

const TipCard = props => {
  return (
    <Paper className={props.className}>
      <p>Daily Tips: ${props.tips}</p>
      <p>Hours Worked: {props.hours}</p>
      <p>Hourly Average: ${props.average}/hr</p>
      <p>Notes: {props.notes}</p>
    </Paper>
  );
};

export default styled(TipCard)`
  padding: 10px 0;
`;
