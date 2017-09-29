import React from 'react';
import styled from 'styled-components';
import MonthlyStatistics from './MonthlyStatistics';

class Statistics extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <h2>Statistics</h2>
        <MonthlyStatistics data={this.props.data} />
      </div>
    );
  }
}

export default styled(Statistics)`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
`;
