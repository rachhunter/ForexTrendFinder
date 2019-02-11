//Logout screen
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { Button, Card, CardSection, Header, Spinner } from '../common';

class Logout extends Component {

  onButtonPress() {
    this.props.logoutUser();
  }

  //show spinner if auth state is 'loading'
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log Out
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <Header>
          Log Out
        </Header>
        <CardSection>
            {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading
});

export default connect(mapStateToProps, { logoutUser })(Logout);
