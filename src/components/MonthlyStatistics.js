import React from 'react';
import styled from 'styled-components';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';
import Chart from './Chart';
import trailingZero from '../utils/trailingZero';

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

    //Here lets shape our data into something useable by a VX bar Chart
    const data = filteredData.map(d => {
      return {
        date: `${d.year}-${trailingZero(d.month)}-${trailingZero(d.day)}`,
        tipAmount: d.tipAmount
      };
    });

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
          <Chart data={data} />
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
    height: 200px;

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
  padding-bottom: 50px;
  @media (max-width: 650px) {
    width: 300px;
    height: 200px;
  }
`;
export default styled(MonthlyStatistics)`
  max-width: 1000px;
  margin: 0 auto;
`;
