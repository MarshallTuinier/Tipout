import React, { Component } from 'react';
import { MenuItem, DropDownMenu } from 'material-ui';

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
const months = monthNames.map((month, index) => (
  <MenuItem value={index} key={index} primaryText={monthNames[index]} />
));

export default class MonthDropdown extends Component {
  render() {
    return (
      <DropDownMenu
        maxHeight={300}
        value={this.props.value}
        onChange={this.props.handleMonthChange}
        autoWidth={false}
        style={styles}
      >
        {months}
      </DropDownMenu>
    );
  }
}

const styles = {
  width: 200
};
