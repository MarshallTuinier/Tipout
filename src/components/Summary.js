import React, { Component } from 'react';
import styled from 'styled-components';
import CalendarHeader from './CalendarHeader';
import getAllSummaryData from '../utils/tipSummaryCalculations';
import suffixer from '../utils/suffixer';
import ScrollAnimation from 'react-animate-on-scroll';

class Summary extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth()
    };
  }

  handleNext = () => {
    if (this.state.month === 11) {
      this.setState(prevState => ({
        month: 0,
        year: prevState.year + 1
      }));
    } else {
      this.setState(prevState => ({
        month: prevState.month + 1
      }));
    }
  };

  handlePrev = () => {
    if (this.state.month === 0) {
      this.setState(prevState => ({
        month: 11,
        year: prevState.year - 1
      }));
    } else {
      this.setState(prevState => ({
        month: prevState.month - 1
      }));
    }
  };

  render() {
    //Here we filter our data to only diplay from the month selected in the CalendarHeader Component
    //Data comes from various helper functions in tipSummaryCalculations in the utils folder
    const filteredTipsByMonth = this.props.data.User.tips.filter(
      month => month.month === this.state.month
    );
    const summaryData = getAllSummaryData(filteredTipsByMonth);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    console.log(summaryData);
    console.log(this.props);
    return (
      <div className={this.props.className}>
        <CalendarHeader
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          year={this.state.year}
          month={this.state.month}
        />
        <Content>
          {summaryData.highestTipDay === 'none' ? (
            <p className="scroll-text">
              It looks like you haven't entered any information for this month.
              Let's change that!
            </p>
          ) : (
            <div>
              <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutUp">
                <p>
                  In {monthNames[this.state.month]} of {this.state.year} ,
                  you've made a total of <b>${summaryData.totalTips}</b> with an
                  hourly average of <b>${summaryData.totalAverage}</b>.
                </p>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutUp">
                <p>
                  Your best single earning day was{' '}
                  <b>
                    {summaryData.highestTipDay.dayName} the{' '}
                    {suffixer(summaryData.highestTipDay.day)}
                  </b>{' '}
                  when you made <b>${summaryData.highestTipDay.tipAmount}</b>.
                  Great job!
                </p>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutUp">
                <p>
                  Your best single hourly day was{' '}
                  <b>
                    {summaryData.highestHourlyDay.dayName} the{' '}
                    {suffixer(summaryData.highestHourlyDay.day)}
                  </b>{' '}
                  wen you averaged{' '}
                  <b>
                    ${Math.round(
                      summaryData.highestHourlyDay.tipAmount /
                        summaryData.highestHourlyDay.hoursWorked
                    )}/hr
                  </b>.
                </p>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutUp">
                <p>
                  The best day of the week for you was{' '}
                  <b>{summaryData.bestTipDayOfWeek.dayName}</b>. You worked{' '}
                  {summaryData.bestTipDayOfWeek.tipData.length} of those days
                  for a total tip count of{' '}
                  <b>${summaryData.bestTipDayOfWeek.totalTips}</b>. That's an
                  average of{' '}
                  <b>
                    ${summaryData.bestTipDayOfWeek.totalTips /
                      summaryData.bestTipDayOfWeek.tipData.length}
                  </b>{' '}
                  every {summaryData.bestTipDayOfWeek.dayName}! Crazy!
                </p>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutUp">
                <p>
                  From an hourly standpoint, your best day was{' '}
                  <b>{summaryData.bestHourlyDayOfWeek.dayName}</b>. You worked a
                  total of <b>
                    {summaryData.bestHourlyDayOfWeek.totalHours}
                  </b>{' '}
                  hours on that day of the week, and averaged{' '}
                  <b>
                    ${summaryData.bestHourlyDayOfWeek.hourlyAverage} per hour
                  </b>.
                </p>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutUp">
                <p>
                  <b>Keep crushing it!</b>
                </p>
              </ScrollAnimation>
            </div>
          )}
        </Content>
      </div>
    );
  }
}

//-------------------------Styles----------------------------

const Content = styled.div`
  .heading {
    font-size: 40px;
    font-weight: bold;
  }

  .scroll-text {
    font-size: 40px;
    margin: 2em 1em;
  }

  p {
    margin: 250px 1em;
    font-size: 40px;
  }

  @media (max-width: 600px) {
    .heading {
      font-size: 30px;
    }

    p {
      font-size: 25px;
      margin: 150px 1em;
    }
  }
`;
export default styled(Summary)`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 47px;
  margin-top: 50px;
`;
