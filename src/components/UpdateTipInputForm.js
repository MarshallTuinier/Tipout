import React from 'react';
import Formsy from 'formsy-react';
import { RaisedButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import { graphql, gql } from 'react-apollo';

const updateMutation = gql`
  mutation updateTip(
    $id: ID!
    $tipAmount: Float!
    $hoursWorked: Float!
    $year: Int!
    $month: Int!
    $day: Int!
    $notes: String
  ) {
    updateTip(
      id: $id
      tipAmount: $tipAmount
      hoursWorked: $hoursWorked
      year: $year
      month: $month
      day: $day
      notes: $notes
    ) {
      id
      tipAmount
      hoursWorked
      year
      month
      day
      notes
    }
  }
`;

class UpdateTipInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      tipAmount: props.tipAmount,
      hoursWorked: props.hoursWorked,
      notes: props.notes
    };
  }

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  submitForm = data => {
    const tipAmount = parseFloat(this.state.tipAmount);
    const hoursWorked = parseFloat(this.state.hoursWorked);
    const year = this.props.year;
    const month = this.props.month;
    const day = this.props.day;
    const notes = this.state.notes;
    const id = this.props.id;

    this.props
      .updateMutation({
        variables: { id, tipAmount, hoursWorked, year, month, day, notes }
      })
      .then(() => {
        //this.props.hideInputForm()
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

const FormWithMutation = graphql(updateMutation, { name: 'updateMutation' })(
  UpdateTipInputForm
);

export default FormWithMutation;
