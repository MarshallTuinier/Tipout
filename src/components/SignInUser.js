import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Formsy from 'formsy-react';
import { RaisedButton, Paper } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';


class SignInUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      canSubmit: false,
    }
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  }

  disableButton = () => {
    this.setState({ canSubmit: false })
  }

  handleEmailChange = event => {
    this.setState({email: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  signinUser = () => {
    const { email, password } = this.state;
    console.log('called')
    this.props.signinUserMutation({variables: {email, password}})
      .then((response) => {
            window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
            window.localStorage.setItem('graphcoolUserID', response.data.signinUser.user.id)
            window.location.reload();
            this.props.history.push('/')
          }).catch((e) => {
            alert('Error signing in, please try again.')
            console.log(e)
            this.props.history.push('/')
          })
  }

  render() {
      const styles = {
        paperStyle: {
          width: '300px',
          margin: '10px auto',
          marginBottom: '30px',
          paddingBottom: '10px',
          overflow: 'hidden',

        },
        inputStyle: {
          margin: 'auto',
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
      }

      const {paperStyle, inputStyle, submitStyle, formStyle } = styles;

      return(
        <Paper style={paperStyle} zDepth={2}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.signinUser}
            style={formStyle}
          >
            <FormsyText
              name='Email'
              required
              validations='isEmail'
              floatingLabelText='Email'
              value={this.state.email}
              onChange={this.handleEmailChange}
              validationError='Please enter a valid email address'
              style={inputStyle}
            />
            <FormsyText
              name='password'
              type='password'
              required
              floatingLabelText='Password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
              autoComplete='off'
              style={inputStyle}
            />
            <div>
              <RaisedButton
                style={submitStyle}
                onTouchTap={() => this.props.history.push('/')}
                label='Go Back'
              />
              <RaisedButton
                style={submitStyle}
                type='submit'
                label="Submit"
                primary={true}
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </Paper>
    )
  }
}

const signinUserMutation = gql`
  mutation signinUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export default graphql(signinUserMutation, { name: 'signinUserMutation' })(withRouter(SignInUser))
