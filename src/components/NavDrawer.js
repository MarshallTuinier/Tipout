import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, MenuItem, Divider } from 'material-ui';

class NavDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: nextProps.open
      });
    }
  }

  handleLogout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken');
    window.localStorage.removeItem('graphcoolUserID');
    this.props.history.push('/');
    window.location.reload();
  };

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        <div
          style={{
            height: '45px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          Welcome, {this.props.data.User.firstName}!
        </div>
        <Divider />
        <MenuItem
          onTouchTap={() => {
            this.props.handleClose();
            this.props.history.push('/Calendar');
          }}
        >
          Calendar
        </MenuItem>
        <MenuItem
          onTouchTap={() => {
            this.props.handleClose();
            this.props.history.push('/Summary');
          }}
        >
          Summary
        </MenuItem>
        <MenuItem
          onTouchTap={() => {
            this.props.handleClose();
            this.props.history.push('/Statistics');
          }}
        >
          Statistics
        </MenuItem>
        <Divider />
        <MenuItem onTouchTap={this.handleLogout}>Sign Out</MenuItem>
      </Drawer>
    );
  }
}

export default withRouter(NavDrawer);
