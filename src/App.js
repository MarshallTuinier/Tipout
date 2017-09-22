import React from 'react';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import Nav from './components/Nav';
import Calendar from './components/Calendar';
import Summary from './components/Summary';
import Statistics from './components/Statistics';

class App extends React.Component {
  componentDidMount() {
    /*
    //TODO: Set up functional user subscriptions to get rid of page reloading on data changes
    this.props.subscribeToUserChange({
      id: this.props.id,
    })
    */
  }

  render() {
    if (this.props.userQuery.loading === true) {
      return <div>LOADING...</div>;
    }

    return (
      <div className={this.props.className}>
        <Nav data={this.props.userQuery} />
        <Switch>
          <Route
            path="/Calendar"
            component={() => (
              <Calendar
                data={this.props.userQuery}
                loading={this.props.userQuery.loading}
              />
            )}
          />
          <Route
            path="/Summary"
            component={() => <Summary data={this.props.userQuery} />}
            loading={this.props.userQuery.loading}
          />
          <Route
            path="/Statistics"
            component={() => (
              <Statistics
                data={this.props.userQuery}
                loading={this.props.userQuery.loading}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const userQuery = gql`
  query userQuery($id: ID) {
    User(id: $id) {
      id
      firstName
      lastName
      tips {
        id
        tipAmount
        hoursWorked
        notes
        year
        month
        day
        dayName
      }
    }
  }
`;
/*
//TODO: Set up functional user subscriptions to get rid of page reloading on data changes

const userSubscription = gql`
  subscription onUserChange($id: ID) {
    User(id: $id) {
      id
      firstName
      lastName
      tips {
        id
        tipAmount
        hoursWorked
        notes
        year
        month
        day
      }
    }
  }
`*/

const AppWithData = graphql(userQuery, {
  name: 'userQuery',
  options: ownProps => ({ variables: { id: ownProps.id } })
  /*
//TODO: Set up functional user subscriptions to get rid of page reloading on data changes
  props: props => {
    return {
      subscribeToUserChange: params => {
        return props.userQuery.subscribeToMore({
          document: userSubscription,
          variables: {
            id: params.id
          },
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
              console.log(subscriptionData)
              return prev;
            } else {

            }

          }
        })
      }
    }
  }
  */
});

const StyledApp = styled(App)`
  color: #212121;
  position: relative;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: 0;
`;

export default AppWithData(withRouter(StyledApp));
