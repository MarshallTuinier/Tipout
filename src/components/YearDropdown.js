import React, { Component } from 'react';
import { MenuItem, DropDownMenu } from 'material-ui';

const years = [];
for (let i = 2010; i < 2025; i++) {
  years.push(<MenuItem value={i} key={i} primaryText={i} />);
}

export default class YearDropdown extends Component {
  render() {
    return (
      <DropDownMenu
        maxHeight={300}
        value={this.props.value}
        onChange={this.props.handleYearChange}
      >
        {years}
      </DropDownMenu>
    );
  }
}
