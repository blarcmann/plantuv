import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Block, Text, Input } from '../components';
import { theme } from '../constants';

export class Forgot extends Component {
  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false,
  }

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Password sent',
        'Please check your email',
        [
          {
            text: 'OK', onPress: () => {
              navigation.navigate('Login')
            }
          }
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Error',
        'Please check the email address',
        [
          { text: 'Try again' }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block style={styles.container} padding={[theme.sizes.base, theme.sizes.base * 2]}>
          <Text h2 bold>Forgot</Text>
          <Block middle>
            <Input
              label="Email"
              errors={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button gradient onPress={() => this.handleForgot()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Forgot</Text>
              }
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const VALID_EMAIL = "yemiotola@gmail.com";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  forgot: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
})
export default Forgot;
