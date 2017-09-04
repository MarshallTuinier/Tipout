import React, { Component } from 'react'
import styled from 'styled-components';
import CalendarItem from './CalendarItem'
import Swipe from 'react-easy-swipe'
import { SlideLeft, SlideRight, FadeIn } from '../utils/AnimationHelpers'

export default class CalendarGridBuilder extends Component {

  // Calculates days in the selected month
  daysInCurrentMonth = (year, month) => {
    let days = new Date(year, month + 1, 0).getDate();
    return days;
  }

  // Calculates the day on which the current month starts
  firstDay = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day;
  }

  // Creates JSX elements for empty placeholders in the calender.
  // Takes one parameter for the number created (Generally the day which the month starts, to maintain grid view)
  makePlaceholder = (i, ...props) => {
    const Placeholder = styled.div`
      display: inline-block;
      width: 13.11vw;
      height: 16.75vw;
      max-width: 138px;
      max-height: 160px;
      float: left;
      margin-right: 1px;
    `
    return <Placeholder className={props.className} key={'placeholder-'+i}></Placeholder>
  }

  // Creates JSX elements corresponding to one individual calendar day
  // If forceShowDialog is true (from the picker being used), this dialog will open automatically on render.
  makeDay = (tipData, date, startingDay, month, year, forceShowDialog) => {
    let filteredTipData = tipData.filter(tip => tip.day === date)[0]
    return (
      <CalendarItem
        date={date}
        month={month}
        year={year}
        key={'calendar-item-'+ date}
        startingDay={startingDay}
        forceShowDialog={forceShowDialog}
        tipData={filteredTipData}
        loading={this.props.loading}
        user={this.props.user}
      />
    )
  }

  makePlaceholderArray = (number) => {
    let arr = [];
    for(let i=0; i<number; i++) {
      arr.push(this.makePlaceholder(i))
    }
    return arr;
  }

  makeDaysArray = (tipData, number, startingDay, month, year, pickerFocusDate) => {
    let arr = []
    for(let i=1; i<=number; i++) {
      if (i === pickerFocusDate) {
        arr.push(this.makeDay(tipData, i, startingDay, month, year, true))
      } else {
        arr.push(this.makeDay(tipData, i, startingDay, month, year, false))
      }
    }
    return arr
  }

  constructor(props) {
    super(props);
    const startingDay = this.firstDay(this.props.year, this.props.month);
    const numberOfDays = this.daysInCurrentMonth(this.props.year, this.props.month);
    const placeholderArray = this.makePlaceholderArray(startingDay)
    const daysArray = this.makeDaysArray(this.props.tipData, numberOfDays, startingDay, this.props.month, this.props.year, this.props.pickerFocusDate)
    this.state = {
      startingDay,
      numberOfDays,
      placeholderArray,
      daysArray,
      shouldExit: false,
      animationLeft: true,
      pickerFocusDate: this.props.pickerFocusDate,
      tipData: this.props.tipData,
    }
  }

  componentWillReceiveProps(nextProps) {

    //Check to see if new props are different than current props
    //If so, set the state accordingly

    if(this.props.month !== nextProps.month || this.props.year !== nextProps.year) {

      //The following if statement controls whether the component should animate in from the left or the right
      //If the next month prop is the lower value, i.e. the previous month button was pressed, it will animate in from the left.
      //Else it will animate in from the right

      if(nextProps.month > this.props.month && this.props.year === nextProps.year) {
        this.setState({
          animationLeft: true
        })
      } else if(nextProps.year > this.props.year) {
        this.setState({
          animationLeft: true
        })
      } else if(nextProps.year < this.props.year) {
        this.setState({
          animationLeft: false
        })
      } else {
        this.setState({
          animationLeft: false
        })
      }
      this.setState({
        startingDay: null,
        numberOfDays: null,
        placeholderArray: null,
        daysArray: null,
        shouldExit: true,
      })
      const startingDay = this.firstDay(nextProps.year, nextProps.month);
      const numberOfDays = this.daysInCurrentMonth(nextProps.year, nextProps.month);
      const placeholderArray = this.makePlaceholderArray(startingDay)
      const daysArray = this.makeDaysArray(nextProps.tipData, numberOfDays, startingDay, nextProps.month, nextProps.year, nextProps.pickerFocusDate)
      this.setState({
        startingDay,
        numberOfDays,
        placeholderArray,
        daysArray,
        tipData: nextProps.tipData,
      })
      setTimeout(() => {
        this.setState({
          shouldExit: false
        })
      }, 0)

    }
  }


  render() {
    return(
      <Swipe
        allowMouseEvents={true}
        onSwipeLeft={this.props.handleNext}
        onSwipeRight={this.props.handlePrev}
      >
        <CalendarGrid
          exit={this.state.shouldExit}
          animationLeft={this.state.animationLeft}>
          {this.state.placeholderArray.map((placeholder) =>
            placeholder
          )}
          {this.state.daysArray.map((day) =>
            day
          )}
        </CalendarGrid>
      </Swipe>
    )
  }
}


//----------------Styles----------------------

const CalendarGrid = styled.div`
  position: relative;
  width: 95%;
  height: 70vh;
  max-width: 1000px;
  margin: 0 auto;
  animation: ${FadeIn} 2s;
  ${props => !props.exit && `
      animation: ${props.animationLeft ? SlideLeft : SlideRight} .3s;
  `
  }
`
