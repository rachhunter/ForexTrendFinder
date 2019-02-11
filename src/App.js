// Main App file including set up for the Redux store
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Config } from './Config';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    //firebase project details
      /* ADD YOUR OWN FIREBASE CONFIGURATION DETAILS IN ./src/Config.js */
    firebase.initializeApp(Config);
  }

  render() {
    // use Redux Thunk middleware to allow asynchronous actions, like calls to Firebase
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // view Redux store in the console
    store.subscribe(() => {
      console.log(store.getState());
    });
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
