//Register screen
import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  firstnameChanged,
  lastnameChanged,
  emailChanged,
  passwordChanged,
  confirmPwdChanged,
  registerUser
} from '../actions';
import { Card, CardSection, Header, Input, Button, Spinner } from '../common';
import styles from '../Styles';

class Register extends Component {

  onFirstnameChange(text) {
    this.props.firstnameChanged(text);
  }

  onLastnameChange(text) {
    this.props.lastnameChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConfirmPwdChange(text) {
    this.props.confirmPwdChanged(text);
  }

  onButtonPress() {
    const { firstname, lastname, email, password, passwordconfirm } = this.props;

    this.props.registerUser({ firstname, lastname, email, password, passwordconfirm });
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
        Register
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
            returnKeyType="next"
            placeholder="First Name"
            label="firstname"
            maxLength={16} //maximum length of input is 16 characters or spaces
            onChangeText={this.onFirstnameChange.bind(this)}
            value={this.props.firstname}
          />
        </CardSection>
        <CardSection>
          <Input
            returnKeyType="next"
            placeholder="Last Name"
            label="Last Name"
            maxLength={16} //maximum length of input is 16 characters or spaces
            onChangeText={this.onLastnameChange.bind(this)}
            value={this.props.lastname}
          />
        </CardSection>

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

        <CardSection>
          <Input
            secureTextEntry
            returnKeyType="go"
            placeholder="Password Confirmation"
            label="passwordconfirm"
            onChangeText={this.onConfirmPwdChange.bind(this)}
            value={this.props.passwordconfirm}
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
  const { firstname, lastname, email, password, passwordconfirm, error, loading } = auth;
  return { firstname, lastname, email, password, passwordconfirm, error, loading };
};

export default connect(mapStateToProps, {
  firstnameChanged,
  lastnameChanged,
  emailChanged,
  passwordChanged,
  confirmPwdChanged,
  registerUser
})(Register);
