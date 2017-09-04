import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom'
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { GC_AUTH_TOKEN } from './utils/constants'


const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj62iufbl5dtj0150l36xa1j4' 
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])
// Create WebSocket client

const wsClient = new SubscriptionClient('wss://subscriptions.us-west-2.graph.cool/v1/cj62iufbl5dtj0150l36xa1j4', {
  reconnect: true
})
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})


injectTapEventPlugin();
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <MuiThemeProvider>
        <AppContainer />
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
  ,document.getElementById('root'));
registerServiceWorker();
