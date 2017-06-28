/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
//const firebase = require('firebase');
const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const styles = require('../styles.js')

const {
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Button,
} = ReactNative;

const firebaseApp = require('../initFirebase.js')

class GroceryList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    const { params } = this.props.navigation.state;
    //console.log("User",props.user);
    /*
    user:{
      uid:"",
      email:"",
      displayName:"",
      phoneNumber:"",
      photoURL:"",
    }
    */
    this.itemsRef = this.getRef().child('items').child(params.user.uid);
    this.itemsQuery = this.itemsRef.orderByChild("title");
    this._addItem = this._addItem.bind(this)
  }
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    //navigation.navigate('Chat', { user:  'Lucy' });
    return {
      title: 'Grocery List',
      headerRight: <Button title="Add" onPress={()=> navigation.navigate('AddItem' )} />,
    };
  }

  getRef() {
    return firebaseApp.database().ref();
    return this.props.firebaseApp.database().ref();
  }

  listenForItems(itemsQuery) {
    itemsQuery.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      console.log("GroceryList listenForItems setState of items");
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    console.log("GroceryList componentDidMount");
    //this.props.navigation.setParams({ _addItem: this._addItem });
    this.listenForItems(this.itemsQuery);
  }
  
  render() {
    //<ActionButton onPress={this._addItem.bind(this)} title="Add" />
    //<StatusBar title="Grocery List" />
    return (
      <View style={styles.container}>
        
        <ListView
          contentInset={{bottom:49}}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        
      </View>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}

import { StackNavigator } from 'react-navigation';
const AddItem = require("./AddItem");
const App = StackNavigator({
  GroceryList: { screen: GroceryList },
  AddItem: { screen: AddItem },
}//,{ headerMode: 'none' }
);

module.exports = App;