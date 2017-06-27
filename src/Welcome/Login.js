import React, {Component} from 'react';
import ReactNative from 'react-native';
const ActionButton = require('../components/ActionButton');
const styles = require('../styles.js')
const constants = styles.constants;
const { View, TouchableHighlight, Text, TextInput } = ReactNative;
//const firebaseApp = require('../initFirebase.js')

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",password:""
    };
    this.doLogin = this.doLogin.bind(this);
    this.doSignup = this.doSignup.bind(this);
  }
  doLogin(){
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    //this.props.doLogin(user);
  }
  doSignup(){
    this.props.firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(user) {
        console.log("createUser ",user);
        this.setState({email:"",password:""});
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("createUserWithEmailAndPassword Error",errorCode,errorMessage);
      // ...
    });
  }
  render() {
    return (
      <View style={styles.login}>
        <Text style={styles.subHeading} >Login</Text>
        <TextInput
        style={styles.simpleInput}
        keyboardType="email-address" placeholder="Email" autoCapitalize="none"
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        />
        <TextInput
        style={styles.simpleInput}
        secureTextEntry={true} autoCapitalize="none" placeholder="Password" 
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        />
        <ActionButton onPress={this.doLogin} title="Login" />
        <Text style={styles.subHeading} >Don't Have an account?</Text>
        <ActionButton onPress={this.doSignup} style={styles.actionBlue} backgroundColor={styles.constants.actionBlue} title="Sign Up" />
      </View>
    );
  }
}

module.exports = Login;
