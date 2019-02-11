//Login screen
import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Header, Input, Button, Spinner } from '../common';
import styles from '../Styles';

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  //display error or allocate a blank area for it
  renderError() {
    if (this.props.error) {
      return (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>
            {this.props.error}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.errorView}>
        <Text>
         {" "}
        </Text>
      </View>
    );
  }

  //show spinner if auth state is 'loading'
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <Header>
          Forex Trend Finder
        </Header>
        <CardSection>
          <Input
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email"
            label="email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            returnKeyType="next"
            placeholder="Password"
            label="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
            {this.renderButton()}
        </CardSection>

        <TouchableOpacity onPress={() => Linking.openURL('http://traderRach.com')}>
          <Text style={styles.creditText}>
            {'\n'} Brought to you by http://traderRach.com
          </Text>
        </TouchableOpacity>

      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(Login);
