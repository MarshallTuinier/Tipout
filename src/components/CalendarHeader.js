import React from 'react';
import { RaisedButton } from 'material-ui';
import styled from 'styled-components';

const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarHeader = (props) => {
  return (
    <div className={props.className}>
      <RaisedButton label='&larr;' onTouchTap={props.handlePrev} primary={true} className='calendar-button'/>
      <div
        onTouchTap={props.handleOpenDatePicker}
        style={{'fontSize': '25px', 'cursor': 'pointer',}}>
        {monthNamesFull[props.month]}  {props.year}
      </div>
      <RaisedButton label='&rarr;' onTouchTap={props.handleNext} primary={true} className='calendar-button'/>
    </div>
  )
}

export default styled(CalendarHeader)`
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin: 0 auto 20px auto;
  max-width: 600px;
  align-items: center;
  width: 90vw;
  padding-bottom: 20px;
  @media (max-width: 600px) {
    .calendar-header h2 {
      font-size: 20px;
    }
    .calendar-button {
      min-width: 0 !important;
      max-width: 20vw !important;
    }
  }
`
