import React, { Component } from 'react'
import styled from 'styled-components'
import CalendarHeader from './CalendarHeader'
import { getAllSummaryData } from '../utils/tipSummaryCalculations'
class Summary extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  }

  handleNext = () => {
    if (this.state.month === 11) {
      this.setState(prevState => ({
        month: 0,
        year: prevState.year + 1,
      }))
    } else {
      this.setState(prevState => ({
        month: prevState.month + 1,
      }))
    }
  }

  handlePrev = () => {
    if (this.state.month === 0) {
      this.setState(prevState => ({
        month: 11,
        year: prevState.year - 1,
      }))
    } else {
      this.setState(prevState => ({
        month: prevState.month - 1,
      }))
    }
  }

  render() {
    const filteredTipsByMonth = this.props.data.User.tips.filter(month => month.month === this.state.month)
    const summaryData = getAllSummaryData(filteredTipsByMonth)
    console.log(summaryData)
    console.log(this.props)
    return(
      <div className={this.props.className}>
        <CalendarHeader
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          year={this.state.year}
          month={this.state.month}
        />
        <Content>
          <span className='heading'>Hey {this.props.data.User.firstName}!</span>
          {summaryData.highestTipDay === "none"
          ?
            <p>It looks like you haven't entered any information for this month.  Let's change that!</p>
          :
            <div></div>
          }
        </Content>
      </div>
    )
  }
}


const Content = styled.div`
  .heading {
    font-size: 50px;
  }

  @media(max-width: 600px) {
    .heading {
      font-size: 40px;
    }
  }
`
export default styled(Summary)`
  padding-top: 47px;
`
