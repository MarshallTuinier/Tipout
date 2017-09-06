import React, { Component } from 'react'
import { MenuItem, DropDownMenu } from 'material-ui'

const years = [];
for (let i = 2000; i < 2100; i++ ) {
  years.push(<MenuItem value={i} key={i} primaryText={i} />);
}

export default class YearDropdown extends Component {

  constructor(props) {
    super(props);
    const currentYear = new Date().getFullYear()
    this.state = {
      value: currentYear
    }
  }

  handleChange = (event, index, value) => {
    this.setState({value})
  }

  render() {
    return (
      <DropDownMenu
        maxHeight={300}
        value={this.state.value}
        onChange={this.handleChange}
      >
        {years}
      </DropDownMenu>
    );
  }
}
