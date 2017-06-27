import React, {Component} from 'react';
import ReactNative from 'react-native';
const Login = require("./Login");
const StatusBar = require('../components/StatusBar');
const styles = require('../styles.js');
const constants = styles.constants;
const { View, TouchableHighlight, Text, TextInput } = ReactNative;
//const firebaseApp = require('../initFirebase.js')

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <View style={styles.login}>
        <StatusBar title="Welcome" />
        <Login firebaseApp={this.props.firebaseApp} />
      </View>
    );
  }
}

module.exports = Welcome;
