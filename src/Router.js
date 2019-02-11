// Determines which screen to show to the user, depending on 'user' state
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages, AuthTabs } from './Navigate';
import { Spinner } from './common';

class Router extends Component {
  render() {
    switch (true) {
        case ((this.props.user === null || undefined)):
          return <AuthTabs />;
        case ((this.props.user !== null || undefined)):
          return <Pages />;
        default:
          return <Spinner />;
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps)(Router);
