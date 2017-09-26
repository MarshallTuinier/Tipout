import React from 'react';
import Formsy from 'formsy-react';
import { RaisedButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const addMutation = gql`
  mutation addTip(
    $tipAmount: Float!
    $hoursWorked: Float!
    $year: Int!
    $month: Int!
    $day: Int!
    $notes: String
    $userId: ID
    $dayName: String
    $fullDate: String!
  ) {
    createTip(
      tipAmount: $tipAmount
      hoursWorked: $hoursWorked
      year: $year
      month: $month
      day: $day
      notes: $notes
      userId: $userId
      dayName: $dayName
      fullDate: $fullDate
    ) {
      tipAmount
      hoursWorked
      year
      month
      day
      notes
      dayName
      fullDate
      user {
        id
      }
    }
  }
`;

class NewTipInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      tipAmount: '',
      hoursWorked: '',
      notes: ''
    };
  }

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  submitForm = () => {
    const tipAmount = parseFloat(this.state.tipAmount);
    const hoursWorked = parseFloat(this.state.hoursWorked);
    const { year, month, day, notes, userId, dayName } = this.props;
    const fullDate = `${month}/${day}/${year}`;

    this.props
      .mutate({
        variables: {
          tipAmount,
          hoursWorked,
          year,
          month,
          day,
          notes,
          userId,
          dayName,
          fullDate
        }
      })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        alert('Sorry, there was an error');
        console.error(error);
      });
  };

  notifyFormError = error => {
    console.error(`form error: ${error}`);
  };

  handleTipChange = event => {
    this.setState({ tipAmount: event.target.value });
  };

  handleHoursChange = event => {
    this.setState({ hoursWorked: event.target.value });
  };

  handleNotesChange = event => {
    this.setState({ notes: event.target.value });
  };

  render() {
    const styles = {
      paperStyle: {
        width: '98%',
        margin: '10px auto',
        marginBottom: '30px',
        paddingBottom: '10px',
        overflow: 'hidden'
      },
      inputStyle: {
        margin: 'auto'
      },
      submitStyle: {
        margin: '20px auto',
        marginRight: '10px',
        marginLeft: '5px'
      },
      formStyle: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto'
      }
    };

    const { paperStyle, inputStyle, submitStyle, formStyle } = styles;
    return (
      <div style={{ height: '95vh' }}>
        <div style={paperStyle}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
            style={formStyle}
          >
            <FormsyText
              name="tipAmount"
              required
              validations="isNumeric"
              floatingLabelText="How much did you make?"
              hintText="Tips"
              value={this.state.tipAmount}
              onChange={this.handleTipChange}
              validationError="Please enter a number"
              autoComplete="off"
              style={inputStyle}
            />
            <FormsyText
              name="hoursWorked"
              required
              validations="isNumeric"
              floatingLabelText="Hours Worked?"
              hintText="Hours"
              value={this.state.hoursWorked}
              onChange={this.handleHoursChange}
              validationError="Please enter a number"
              autoComplete="off"
              style={inputStyle}
            />
            <FormsyText
              name="notes"
              hintText="Notes"
              floatingLabelText="Any notes for the day?"
              value={this.state.notes}
              onChange={this.handleNotesChange}
              autoComplete="off"
              style={inputStyle}
            />
            <div>
              <RaisedButton
                style={submitStyle}
                onTouchTap={this.props.hideInputForm}
                label="Cancel"
              />
              <RaisedButton
                style={submitStyle}
                type="submit"
                label="Submit"
                primary={true}
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

const FormWithMutation = graphql(addMutation)(NewTipInputForm);

export default withRouter(FormWithMutation);
