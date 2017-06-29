import React, {Component} from 'react';
import ReactNative from 'react-native';


const styles = require('../styles.js');
const constants = styles.constants;
const { View, TouchableHighlight, Text, TextInput } = ReactNative;
const firebaseApp = require('../initFirebase.js')
import { NavigationActions } from 'react-navigation';

class Splash extends Component {
  static navigationOptions = {
      title: '',
    };
  constructor(props) {
    super(props);
    this.state = {
    };
    const { navigate } = this.props.navigation;
    console.log(firebaseApp,typeof firebaseApp.auth);
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'App',params:{user:user} })],
        });
        this.props.navigation.dispatch(resetAction);
      }else{
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        });
        this.props.navigation.dispatch(resetAction);
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

module.exports = Splash;
