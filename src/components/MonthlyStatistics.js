import React from 'react';
import styled from 'styled-components';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';
import Chart from './Chart';
import getStatistics from '../utils/tipCalculations';

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

    //Below we add a piece of mock data to the end of our data set for the first day of the next month
    //This will allow us to maintin the full month scale on the chart's x-axis
    let paddedData = [];
    if (data.length > 0) {
      paddedData = data.concat({
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
              data={paddedData}
              month={this.state.monthValue}
              year={this.state.yearValue}
            />
          )}
        </ChartContainer>
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
export default styled(MonthlyStatistics)`
  max-width: 1000px;
  margin: 0 auto;
`;
