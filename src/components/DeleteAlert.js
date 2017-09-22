import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

class DeleteAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ open: nextProps.open });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.props.handleDelete}
      />
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Do you really want to delete this tip?
      </Dialog>
    );
  }
}

export default DeleteAlert;
