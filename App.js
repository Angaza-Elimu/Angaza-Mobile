import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StyleSheet, View, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeScreen from './screens/HomeScreen';
import Landing from './screens/Landing';
import LoginScreen from './screens/LoginScreen';
import AccountType from './screens/AccountType';
import BottomTab from './screens/BottomTab';
import PhoneConfirm from './screens/PhoneConfirm';
import OneTimePassword from './screens/OneTimePassword';
import Database, { createTable, insert, search, dropTable } from 'expo-sqlite-query-helper';
import axios from 'axios';

const Stack = createStackNavigator();

const options = {
  //To hide the ActionBar/NavigationBar
  headerShown: false
};




const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: ''
    }
  }
  componentWillMount() {
    this.getToken();
    this.createDB();
  }

  createDB() {
    Database("angaza_data");
    console.log("Creating")
    // dropTable("subtopics");

    // dropTable("notes");
    // dropTable("topics");
    createTable('subtopics', {

      "id": "INT",
      "topic_id": "INT",
      "subtopic_name": "VARCHAR(100)",
      "subject_id": "INT",
      "class": "INT NULL",
      "created_at": "TEXT NULL",
      "updated_at": "TEXT NULL"

    });
    createTable('topics', {

      "id": "INT",
      "topic_name": "VARCHAR(100)",
      "subject_id": "INT",
      "class": "INT NULL",
      "created_at": "TEXT NULL",
      "updated_at": "TEXT NULL"

    });
    createTable('notes', {

      "id": "INT",
      "subtopic_id": "INT",
      "topic_id": "INT",
      "notes": "TEXT",
      "subject_id": "INT",
      "class": "INT NULL",
      "created_at": "TEXT NULL",
      "updated_at": "TEXT NULL"

    });
    this.getNotes().then(response => {
      console.log(response.topics);
      var toString = Object.prototype.toString;
      // console.log(toString.call(response.topics))
      
      const topics = response.topics;
      insert('notes', response.notes)
        .then(({ row, rowAffected, insertID, lastQuery }) => {
          // console.log(row);
          console.log("success")
        })
        .catch((e) => console.log(e));
      search('topics').then(rows => {
        console.log(rows);
      });
    
      insert('subtopics', response.subtopics)
        .then(({ row, rowAffected, insertID, lastQuery }) => {
          console.log('success');
        })
        .catch((e) => console.log(e));

        insert('topics', response.topics)
        .then(({ row, rowAffected, insertID, lastQuery }) => {
          console.log('success');
        })
        .catch((e) => console.log(e));


    });

  }

  async getNotes() {
    const access_token = await AsyncStorage.getItem('access_token');
    const json = await axios.get('http://localhost:8000/api/fetchAll', {
    });
    return json.data;
  }

  getToken() {
    AsyncStorage.getItem('access_token').then(response => {
      if (response == '' || response == undefined || response == null) {
        this.setState({ initialPage: 'Landing' })
      } else {
        this.setState({ initialPage: 'Tab' })
      }
    })
  }
  render() {

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios'}
        <NavigationContainer linking={LinkingConfiguration}>

          <Stack.Navigator initialRouteName={this.state.initialPage}>
            <Stack.Screen options={options} name="Landing" component={Landing} />

            <Stack.Screen options={options} name="Login" component={LoginScreen} />

            <Stack.Screen options={options} name="Account" component={AccountType} />

            <Stack.Screen options={options} name="Phone Confirm" component={PhoneConfirm} />

            <Stack.Screen options={options} name="Tab" component={BottomTab} />

            <Stack.Screen options={options} name="One Time Pass" component={OneTimePassword} />
          </Stack.Navigator>


        </NavigationContainer>
      </View>

    );

  }




}
function drawerNavigate() {
  return <Drawer.Navigator initialRouterName="Login">
    <Drawer.Screen name="Home" component={HomeScreen} />
  </Drawer.Navigator>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
