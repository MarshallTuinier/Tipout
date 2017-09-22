import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Route, Switch, withRouter } from 'react-router-dom';
import App from './App';
import Landing from './components/Landing';
import CreateUser from './components/CreateUser';
import SignInUser from './components/SignInUser';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null
    };
  }

  render() {
    if (this.props.loading === true) {
      return <div>LOADING</div>;
    }

    if (!this.props.data.user) {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/CreateUser" component={CreateUser} />
            <Route path="/SignInUser" component={SignInUser} />
          </Switch>
        </div>
      );
    }

    return <App id={this.props.data.user.id} />;
  }
}

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
  withRouter(AppContainer)
);
