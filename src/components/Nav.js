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
          title={<span style={{'position': 'relative', 'right': '32px', 'fontSize': '30px', 'textShadow': '0 2px 2px rgba(0,0,0,0.4)'}}>Tipout</span>}
          iconElementLeft={<IconButton onTouchTap={this.handleOpenDrawer}><NavigationMenu /></IconButton>}
          style={{position: 'fixed'}}
        >
        </AppBar>
        <NavDrawer open={this.state.openDrawer} handleClose={this.handleCloseDrawer} data={this.props.data} />
      </div>
    )
  }
}
