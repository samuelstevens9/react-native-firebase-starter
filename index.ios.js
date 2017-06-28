/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const firebase = require('firebase');
//const StatusBar = require('./src/components/StatusBar');
//const ActionButton = require('./src/components/ActionButton');
//const ListItem = require('./src/components/ListItem');
//const Login = require('./src/components/Login')
const Welcome = require('./src/Welcome/Welcome')
const App = require('./src/App/App')
const styles = require('./src/styles.js')

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  TabBarIOS,
} = ReactNative;

const firebaseApp = require('./src/initFirebase.js');

class AutomagicListApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:null,
      selectedTab: 'appTab',
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log("onAuthStateChanged user",user);
        this.setState({user});
      }
    });
  }
  doLogin(user){
    this.setState({user});
  }
  render() {
    var logins = (<Welcome firebaseApp={firebaseApp} />)
    if(this.state.user){
      logins = (
        <TabBarIOS >
          <Icon.TabBarItemIOS
            title="App Tab"
            iconName="list"
            selectedIconName="list"
            selected={this.state.selectedTab === 'appTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'appTab',
              });
            }}>
            <App firebaseApp={firebaseApp} user={this.state.user} />
          </Icon.TabBarItemIOS>
        </TabBarIOS>
        
      )
      //logins = (<App firebaseApp={firebaseApp} user={this.state.user} />)
    }
    return (
      <View style={styles.container}>
        {logins}
      </View>
    )
  }
}

AppRegistry.registerComponent('AutomagicListApp', () => AutomagicListApp);