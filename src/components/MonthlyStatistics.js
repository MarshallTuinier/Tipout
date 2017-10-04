import React from 'react';
import styled from 'styled-components';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';
import Chart from './Chart';
import getStatistics from '../utils/tipCalculations';
import { Paper, Divider } from 'material-ui';

class MonthlyStatistics extends React.Component {
  constructor(props) {
    super(props);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.state = {
      yearValue: currentYear,
      monthValue: currentMonth
    };
  }

  handleYearChange = (event, index, value) => {
    this.setState({ yearValue: value });
  };

  handleMonthChange = (event, index, value) => {
    this.setState({ monthValue: value });
  };

  render() {
    //Grab all of our tip data
    const allData = this.props.data.User.tips;

    //Filter the data based on our chosen year/months
    const filteredData = allData.filter(data => {
      return (
        data.year === this.state.yearValue &&
        data.month === this.state.monthValue
      );
    });

    //Grab some statistics based on the filtered data as well
    const statistics = getStatistics(filteredData);
    console.log(statistics);

    //Here lets shape our data into something useable by a VX bar Chart
    const data = filteredData.map(d => {
      return {
        date: new Date(d.year, d.month, d.day),
        tipAmount: d.tipAmount
      };
    });

    //Below we add a piece of dummy data to the end of our data set for the first day of the next month
    //This will allow us to maintin the full month scale on the chart's x-axis
    let chartData = [];
    if (data.length > 0) {
      chartData = data.concat({
        date: new Date(this.state.yearValue, this.state.monthValue + 1, 1),
        tipAmount: 1
      });
    }
    return (
      <div className={this.props.className}>
        <FilterBar>
          <Col>
            <p>Year:</p>
            <span>
              <YearDropdown
                handleYearChange={this.handleYearChange}
                value={this.state.yearValue}
              />
            </span>
          </Col>
          <Col>
            <p>Month:</p>
            <span>
              <MonthDropdown
                handleMonthChange={this.handleMonthChange}
                value={this.state.monthValue}
              />
            </span>
          </Col>
        </FilterBar>
        <ChartContainer>
          {data && (
            <Chart
              data={chartData}
              month={this.state.monthValue}
              year={this.state.yearValue}
            />
          )}
        </ChartContainer>

        <Paper
          zDepth={2}
          style={{ padding: '1em', width: '95%', margin: '3em auto' }}
        >
          <StatsContainer>
            <StatTitle>All Days</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.allData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.totalTips / statistics.allData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.totalAverage} / hr
            </StatItem>
            <StatTitle>Sunday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Sunday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Sunday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Sunday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Sunday.totalTips /
                statistics.dayOfWeekData.Sunday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Sunday.hourlyAverage} / hr
            </StatItem>
            <StatTitle>Monday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Monday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Monday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Monday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Monday.totalTips /
                statistics.dayOfWeekData.Monday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Monday.hourlyAverage} / hr
            </StatItem>
            <StatTitle>Tuesday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Tuesday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Tuesday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Tuesday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Tuesday.totalTips /
                statistics.dayOfWeekData.Tuesday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Tuesday.hourlyAverage} / hr
            </StatItem>
            <StatTitle>Wednesday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Wednesday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Wednesday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Wednesday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Wednesday.totalTips /
                statistics.dayOfWeekData.Wednesday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Wednesday.hourlyAverage} / hr
            </StatItem>
            <StatTitle>Thursday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Thursday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Thursday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Thursday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Thursday.totalTips /
                statistics.dayOfWeekData.Thursday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Thursday.hourlyAverage} / hr
            </StatItem>
            <StatTitle>Friday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Friday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Friday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Friday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Friday.totalTips /
                statistics.dayOfWeekData.Friday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Friday.hourlyAverage} / hr
            </StatItem>
            <StatTitle>Saturday</StatTitle>
            <StatItem>
              <BoldSpan>Days Worked: </BoldSpan>
              {statistics.dayOfWeekData.Saturday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Hours Worked: </BoldSpan>
              {statistics.dayOfWeekData.Saturday.totalHours}
            </StatItem>
            <StatItem>
              <BoldSpan>Total Tips: </BoldSpan>
              ${statistics.dayOfWeekData.Saturday.totalTips}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Average: </BoldSpan>
              ${statistics.dayOfWeekData.Saturday.totalTips /
                statistics.dayOfWeekData.Saturday.tipData.length}
            </StatItem>
            <StatItem>
              <BoldSpan>Daily Hourly Average: </BoldSpan>
              ${statistics.dayOfWeekData.Saturday.hourlyAverage} / hr
            </StatItem>
          </StatsContainer>
        </Paper>
      </div>
    );
  }
}

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  p {
    font-weight: bold;
    margin: 0;
    margin-top: 20px;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: 100px;

    p {
      margin: 0;
    }
  }
`;

const ChartContainer = styled.div`
  margin: 0 auto;
  margin-top: 3em;
  width: 600px;
  height: 400px;
  background-color: rgb(0, 188, 212);
  border-radius: 8px;
  color: white;
  padding: 15px;
  @media (max-width: 650px) {
    width: 90vw;
    height: 200px;
  }
`;

const StatsContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

const StatTitle = styled.h2`
  width: 100%;
  margin-top: 3em;
`;
const StatItem = styled.p`
  width: 33%;
  min-width: 275px;
`;

const BoldSpan = styled.span`font-weight: bold;`;

export default styled(MonthlyStatistics)`
  max-width: 1000px;
  margin: 0 auto;
`;
