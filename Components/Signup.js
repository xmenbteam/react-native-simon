import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';

const Signup = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emptyUsername, setEmptyUsername] = useState(null);
  const [emptyEmail, setEmptyEmail] = useState(null);
  const [emptyPassword, setEmptyPassword] = useState(null);
  const [passwordsMismatch, setPasswordsMismatch] = useState(null);

  const handlePress = () => {
    if (email.length < 1) {
      setEmptyEmail(true);
    } else if (email.length > 0) {
      setEmptyEmail(false);
    }

    if (password.length < 1) {
      setEmptyPassword(true);
    } else if (password.length > 0) {
      setEmptyPassword(false);
    }

    if (username.length < 1) {
      setEmptyUsername(true);
    } else if (username.length > 0) {
      setEmptyUsername(false);
    }

    if (password === confirmPassword) {
      setPasswordsMismatch(false);
    } else {
      setPasswordsMismatch(true);
    }

    if (
      emptyEmail === false &&
      emptyPassword === false &&
      emptyUsername === false &&
      passwordsMismatch === false
    ) {
      navigation.navigate('GameChoice');
    }
  };

  return (
    <View style={styles.signupContainer}>
      <View style={styles.signupItems}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
          dense={true}
        />
        <HelperText type="error" visible={emptyUsername}>
          Enter a username
        </HelperText>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          dense={true}
        />
        <HelperText type="error" visible={emptyEmail}>
          Please enter your email
        </HelperText>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          dense={true}
          secureTextEntry={true}
        />
        <HelperText type="error" visible={emptyPassword}>
          Enter a password
        </HelperText>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Repeat Password"
          dense={true}
          secureTextEntry={true}
        />
        <HelperText type="error" visible={passwordsMismatch}>
          Passwords do not match
        </HelperText>
        <View style={styles.buttons}>
          <Button mode="contained" color="blue" onPress={handlePress}>
            Sign Up
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupItems: {
    width: '50%'
  },
  buttons: {
    marginTop: 5
  }
});

export default Signup;