import React, { Component } from 'react';
import {
  AppBar,
  IconButton,
} from 'material-ui'

import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import NavDrawer from './NavDrawer'




export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
  }

  handleOpenDrawer = () => {
    this.setState({openDrawer: true});
  };

  handleCloseDrawer = () => {
    this.setState({openDrawer: false});
  };

  render() {
    return(
      <div className='Nav'>
        <AppBar
          title={<span style={{'position': 'relative', 'right': '32px', 'fontSize': '30px'}}>Tipout</span>}
          iconElementLeft={<IconButton onTouchTap={this.handleOpenDrawer}><NavigationMenu /></IconButton>}
        >
        </AppBar>
        <NavDrawer open={this.state.openDrawer} handleClose={this.handleCloseDrawer} data={this.props.data} />
      </div>
    )
  }
}
