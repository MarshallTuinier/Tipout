import React, { Component } from 'react';
import { Dialog, FlatButton } from 'material-ui';
import styled from 'styled-components';
import NewTipInputForm from './NewTipInputForm';
import UpdateTipInputForm from './UpdateTipInputForm';
import { graphql, gql } from 'react-apollo';
import DeleteAlert from './DeleteAlert';
import TipCard from './TipCard';

class CalendarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      monthNames: [
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
      ],
      showDialog: false,
      startingDay: this.props.startingDay,
      tipData: this.props.tipData,
      showInputForm: false,
      showDelete: false
    };
  }

  handleClose = () => {
    this.setState({ showDialog: false });
  };

  handleOpen = () => {
    this.setState({ showDialog: true });
  };

  showInputForm = () => {
    this.setState({ showInputForm: true });
  };

  hideInputForm = () => {
    this.setState({ showInputForm: false });
  };

  handleDelete = () => {
    if (!this.state.tipData) {
      return null;
    }
    const id = this.state.tipData.id;
    this.props.deleteMutation({ variables: { id } }).then(() => {
      window.location.reload();
    });
  };

  handleOpenDelete = () => {
    this.setState({ showDelete: true });
  };

  getFullDate = () => {
    const day = (this.props.date + this.state.startingDay - 1) % 7;
    return `${this.state.dayNames[day]} ${this.state.monthNames[
      this.props.month
    ]} ${this.props.date}, ${this.props.year}`;
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.startingDay !== nextProps.startingDay) {
      this.setState({
        startingDay: nextProps.startingDay,
        showDialog: nextProps.forceShowDialog,
        tipData: nextProps.tipData
      });
    }
  }
  render() {
    const day = (this.props.date + this.state.startingDay - 1) % 7;
    const dayName = this.state.dayNames[day];

    if (this.props.loading) {
      return <div>LOADING</div>;
    }
    const actions = [
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleOpenDelete}
      />,
      <FlatButton
        label="Edit"
        primary={true}
        onTouchTap={this.showInputForm}
      />,
      <FlatButton label="Exit" primary={true} onTouchTap={this.handleClose} />
    ];

    const date = this.getFullDate();

    return (
      <CalendarItemContainer className="container" onClick={this.handleOpen}>
        <CalendarItemVertical>
          {this.props.date}
          {!!this.state.tipData ? (
            <div>
              <StyledPillbox>${this.state.tipData.tipAmount}</StyledPillbox>
              <StyledPillbox>
                ${Math.round(
                  this.state.tipData.tipAmount / this.state.tipData.hoursWorked
                )}/hr
              </StyledPillbox>
            </div>
          ) : null}
        </CalendarItemVertical>
        <Dialog
          title={date}
          actions={actions}
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.handleClose}
          contentStyle={{
            width: '100%',
            maxWidth: '500px',
            height: '80%'
          }}
        >
          {!!this.state.tipData ? (
            <span>
              <TipCard
                tips={this.state.tipData.tipAmount}
                hours={this.state.tipData.hoursWorked}
                average={Math.round(
                  this.state.tipData.tipAmount / this.state.tipData.hoursWorked
                )}
                notes={this.state.tipData.notes}
              />
              <DeleteAlert
                open={this.state.showDelete}
                handleDelete={this.handleDelete}
              />
            </span>
          ) : (
            <h3>Looks like you haven't entered any tips for the day!</h3>
          )}
          {!this.state.tipData ? (
            <Dialog
              modal={false}
              open={this.state.showInputForm}
              onRequestClose={this.hideInputForm}
              autoDetectWindowHeight={false}
              repositionOnUpdate={false}
              contentStyle={{
                width: '90vw',
                maxWidth: '500px',
                transform: 'none'
              }}
              bodyStyle={{ padding: '0' }}
            >
              <NewTipInputForm
                hideInputForm={this.hideInputForm}
                year={this.props.year}
                month={this.props.month}
                day={this.props.date}
                userId={this.props.user}
                dayName={dayName}
              />
            </Dialog>
          ) : (
            <Dialog
              modal={false}
              open={this.state.showInputForm}
              onRequestClose={this.hideInputForm}
              autoDetectWindowHeight={false}
              repositionOnUpdate={false}
              contentStyle={{
                width: '90vw',
                maxWidth: '500px',
                transform: 'none'
              }}
              bodyStyle={{ padding: '0' }}
            >
              <UpdateTipInputForm
                hideInputForm={this.hideInputForm}
                year={this.props.year}
                month={this.props.month}
                day={this.props.date}
                id={this.state.tipData.id}
                tipAmount={this.state.tipData.tipAmount}
                hoursWorked={this.state.tipData.hoursWorked}
                notes={this.state.tipData.notes}
              />
            </Dialog>
          )}
        </Dialog>
      </CalendarItemContainer>
    );
  }
}

// ----------------- Styles --------------------------------

const CalendarItemContainer = styled.div`
  width: 13.11vw;
  height: 16.75vw;
  max-width: 138px;
  max-height: 170px;
  border-top: 1px #bdbdbd solid;
  border-left: 1px #bdbdbd solid;
  display: inline-block;
  float: left;
  overflow: hidden;

  &:nth-last-child(-n + 7) {
    border-bottom: 1px #bdbdbd solid;
  }
  &:nth-child(7n) {
    border-right: 1px #bdbdbd solid;
  }

  &:last-child {
    border-right: 1px #bdbdbd solid;
  }

  &:hover {
    background-color: #e0e0e0;
    transition: 0.2s ease;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    font-size: 3vw;
  }
`;
const CalendarItemVertical = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  justify-content: space-between;
`;

const StyledPillbox = styled.p`
  margin: 5px auto;
  width: 90%;
  background-color: rgb(0, 188, 212);
  color: white;
  border-radius: 10px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
`;
//--------------------------------------

const deleteMutation = gql`
  mutation deleteTip($id: ID!) {
    deleteTip(id: $id) {
      id
    }
  }
`;

export default graphql(deleteMutation, { name: 'deleteMutation' })(
  CalendarItem
);
