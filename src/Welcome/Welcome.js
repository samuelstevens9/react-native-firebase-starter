import React, {Component} from 'react';
import ReactNative from 'react-native';
const Login = require("./Login");
const StatusBar = require('../components/StatusBar');
const styles = require('../styles.js');
const constants = styles.constants;
const { View, TouchableHighlight, Text, TextInput } = ReactNative;
const firebaseApp = require('../initFirebase.js')
import { NavigationActions } from 'react-navigation';

class Welcome extends Component {
  static navigationOptions = {
      title: 'Welcome',
    };
  constructor(props) {
    super(props);
    this.state = {
      
    };
    const { navigate } = this.props.navigation;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log("onAuthStateChanged user",user);
        //this.setState({user});
        //navigate('App',{ user: user });
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'App',params:{user:user} })],
        });

        this.props.navigation.dispatch(resetAction);
      }
    });
  }
  render() {
    //
    return (
      <View style={styles.login}>
        <StatusBar title="Welcome" />
        <Login firebaseApp={firebaseApp} />
      </View>
    );
  }
}

module.exports = Welcome;
