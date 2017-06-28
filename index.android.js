/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
const firebase = require('firebase');
const firebaseApp = require('./src/initFirebase.js');

const { AppRegistry } = ReactNative;

const Splash = require('./src/App/Splash');
const App = require('./src/App/App')
const Welcome = require('./src/Welcome/Welcome')

const TheApp = StackNavigator({
  Splash : {screen: Splash },
  App: { screen: App },
  Welcome: {screen: Welcome },
},{ headerMode: 'none' }
);
AppRegistry.registerComponent('AutomagicListApp', () => TheApp);