import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Route, Switch, withRouter } from 'react-router-dom';
import App from './App';
import Landing from './components/Landing';
import Loading from './components/Loading';
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
      return <Loading />;
    }
    if (this.props.data.user) {
      return <App id={this.props.data.user.id} />;
    }
    if (!this.props.data.user) {
      return (
        <div>
          <Switch>
            <Route path="/Calendar" component={Loading} />
            <Route path="/CreateUser" component={CreateUser} />
            <Route path="/SignInUser" component={SignInUser} />
            <Route path="/" component={Landing} />
          </Switch>
        </div>
      );
    }
    return null;
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
