import React, { Component } from 'react'
import { MenuItem, DropDownMenu } from 'material-ui'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months = monthNames.map((month, index) => <MenuItem value={index} key={index} primaryText={monthNames[index]} />)

export default class YearDropdown extends Component {

  constructor(props) {
    super(props);
    const currentMonth = new Date().getMonth()
    this.state = {
      value: currentMonth
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
}
