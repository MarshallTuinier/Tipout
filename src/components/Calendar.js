import React, { Component } from 'react';
import CalendarGridBuilder from './CalendarGridBuilder';
import CalendarHeader from './CalendarHeader';
import styled  from 'styled-components'
import { SlideLeft } from '../utils/AnimationHelpers'
import { DatePicker } from 'material-ui'

class Calendar extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth(),
      dayNames: ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      pickerValue: null,
      pickerFocusDate: null,
      tipData: props.data.User.tips
    }
  }

  handleOpenDatePicker = () => {
    this.refs.dp.focus()
  }

  handlePickerChange = (event, date) => {
    this.setState({
      pickerValue: date,
      year: date.getFullYear(),
      month: date.getMonth(),
      pickerFocusDate: date.getDate(),
    })
  }

  handleNext = () => {
    if (this.state.month === 11) {
      this.setState(prevState => ({
        month: 0,
        year: prevState.year + 1,
        pickerFocusDate: null,
      }))
    } else {
      this.setState(prevState => ({
        month: prevState.month + 1,
        pickerFocusDate: null,
      }))
    }
  }

  handlePrev = () => {
    if (this.state.month === 0) {
      this.setState(prevState => ({
        month: 11,
        year: prevState.year - 1,
        pickerFocusDate: null,
      }))
    } else {
      this.setState(prevState => ({
        month: prevState.month - 1,
        pickerFocusDate: null,
      }))
    }
  }

  render() {
    const user = this.props.data.User.id
    const tipData = this.state.tipData.filter(tip => tip.month === this.state.month && tip.year === this.state.year)
    return (
        <div className={this.props.className}>
          <StyledDiv>
            <HiddenDiv>
              <DatePicker
                ref='dp'
                value={this.state.pickerValue}
                id='datepick'
                openToYearSelection
                onChange={this.handlePickerChange}
                hideCalendarDate
                autoOk
              />
            </HiddenDiv>
            <CalendarHeader
              handleNext={this.handleNext}
              handlePrev={this.handlePrev}
              handleOpenDatePicker={this.handleOpenDatePicker}
              year={this.state.year}
              month={this.state.month}
            />
          </StyledDiv>
          <DayNamesContainer>
            {this.state.dayNames.map((day) =>
              <DayNames key={day}>{day}</DayNames>
            )}
          </DayNamesContainer>
          <CalendarGridBuilder
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            year={this.state.year}
            month={this.state.month}
            pickerFocusDate={this.state.pickerFocusDate}
            tipData={tipData}
            loading={this.props.loading}
            user={user}
          />
        </div>
    )
  }
}


//styles

const StyledDiv = styled.div`

`
const HiddenDiv = styled.div`
  visibility: hidden;
`
const DayNamesContainer = styled.div`
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`

const DayNames = styled.div`
  font-size: 20px;
  width: 13.9%;
  display: inline-block;
  float: left;
  margin-bottom: 20px;
`

export default styled(Calendar)`
  position: relative;
  animation: ${SlideLeft} .3s
`
