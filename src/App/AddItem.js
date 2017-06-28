import React, {Component} from 'react';
import ReactNative from 'react-native';


const styles = require('../styles.js');
const constants = styles.constants;
const { View, TouchableHighlight, Text, TextInput } = ReactNative;
const firebaseApp = require('../initFirebase.js')
import { NavigationActions } from 'react-navigation';

class AddItem extends Component {
  static navigationOptions = {
      title: 'Add Item',
    };
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    //<StatusBar title="Welcome" />
    return (
      <View style={styles.container}>
        
        <Text>Add Item</Text>
      </View>
    );
  }
}

module.exports = AddItem;
