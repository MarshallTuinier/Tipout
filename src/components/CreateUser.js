import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Formsy from 'formsy-react';
import { RaisedButton, Paper } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import styled from 'styled-components';
import { GC_AUTH_TOKEN, GC_USER_ID } from '../utils/constants.js';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      email: '',
      password: '',
      passwordCheck: '',
      firstName: '',
      LastName: '',
      canSubmit: false
    };
  }

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handlePasswordCheck = event => {
    this.setState({ passwordCheck: event.target.value });
  };

  //Function to handle the creation of a user
  createUser = () => {
    const { firstName, lastName, email, password } = this.state;
    this.props
      .createUserMutation({
        variables: { firstName, lastName, email, password }
      })
      .then(response => {
        //Set our auth tokens to local storage for persistent sign-ins
        window.localStorage.setItem(
          GC_AUTH_TOKEN,
          response.data.signinUser.token
        );
        window.localStorage.setItem(
          GC_USER_ID,
          response.data.signinUser.user.id
        );
        //Default users to the welcome page
        this.props.history.push('/');
        window.location.reload();
      })
      .catch(e => {
        console.error(e);
        this.props.history.push('/');
      });
  };

  render() {
    const styles = {
      paperStyle: {
        width: '300px',
        margin: '0 auto',
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
      <StyledPage>
        <AppText>
          T<span className="logo-i">i</span>pout
        </AppText>
        <StyledContainer className="create-user">
          <h2
            style={{ color: 'white', textShadow: '0 2px 2px rgba(0,0,0,0.4)' }}
          >
            Reg<span className="logo-i">i</span>ster
          </h2>
          <Paper style={paperStyle} zDepth={2}>
            <Formsy.Form
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              onValidSubmit={this.createUser}
              onInvalidSubmit={this.notifyFormError}
              style={formStyle}
            >
              <FormsyText
                name="First Name"
                required
                validations="isWords"
                floatingLabelText="First Name"
                value={this.state.FirstName}
                onChange={this.handleFirstNameChange}
                validationError="Please enter a first name"
                style={inputStyle}
              />
              <FormsyText
                name="Last Name"
                required
                validations="isWords"
                floatingLabelText="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
                validationError="Please enter a valid last name"
                style={inputStyle}
              />
              <FormsyText
                name="Email"
                required
                validations="isEmail"
                floatingLabelText="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                validationError="Please enter a valid email address"
                style={inputStyle}
              />
              <FormsyText
                name="password"
                type="password"
                required
                validations="minLength:6"
                floatingLabelText="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                validationError="Password must be minimum 6 characters"
                autoComplete="off"
                style={inputStyle}
              />
              <FormsyText
                name="passwordCheck"
                type="password"
                required
                validations="equalsField:password"
                floatingLabelText="Confirm Password"
                value={this.state.passwordCheck}
                onChange={this.handlePasswordCheck}
                validationError="Passwords must match"
                autoComplete="off"
                style={inputStyle}
              />
              <div>
                <RaisedButton
                  style={submitStyle}
                  onTouchTap={() => this.props.history.push('/')}
                  label="Go Back"
                />
                <RaisedButton
                  style={submitStyle}
                  onTouchTap={this.createUser}
                  label="Submit"
                  primary={true}
                  disabled={!this.state.canSubmit}
                />
              </div>
            </Formsy.Form>
          </Paper>
        </StyledContainer>
      </StyledPage>
    );
  }
}

const createUserMutation = gql`
  mutation CreateUserMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const StyledContainer = styled.div`
  padding-top: 4vh;
  background-color: #c4c4c4;
  color: white;
  margin: 0 auto;
`;

const StyledPage = styled.div`
  height: 100vh;
  max-height: 110vh
  width: 100vw;
  background-color: #c4c4c4;
  margin: 0 auto;

  .logo-i {
    color: rgb(0, 188, 212);
    position: relative;
  }

  .logo-i:before {
    content: "ı";
    position: absolute;
    color: white;
  }

`;

const AppText = styled.h2`
  margin: 0 auto;
  padding-top: 6vh;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 90px;
`;

export default graphql(createUserMutation, { name: 'createUserMutation' })(
  withRouter(CreateUser)
);
