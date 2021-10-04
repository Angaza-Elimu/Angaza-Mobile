import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StyleSheet, View, AsyncStorage, ToastAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeScreen from './screens/HomeScreen';
import Landing from './screens/Landing';
import LoginScreen from './screens/LoginScreen';

import Loader from 'react-native-modal-loader';
import AccountType from './screens/AccountType';
import BottomTab from './screens/BottomTab';
import PhoneConfirm from './screens/PhoneConfirm';
import OneTimePassword from './screens/OneTimePassword';
import Database, { createTable, insert, search, dropTable } from 'expo-sqlite-query-helper';
import axios from 'axios';
import PaymentScreen from './screens/Payments';


console.disableYellowBox = true;
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

  async createDB() {
    Database("angaza_data");
    console.log("Creating")
    // dropTable("subtopics");

    // dropTable("notes");
    // dropTable("topics");

    //check if records exist


    createTable('subtopics', {

      "id": "INT ",
      "topic_id": "INT",
      "subtopic_name": "VARCHAR(100)",
      "subject_id": "INT NULL",
      "class": "INT NULL",
      "created_at": "TEXT NULL",
      "updated_at": "TEXT NULL"

    }).then((status) => createTable('topics', {
      "id": "INT",
      "topic_name": "TEXT NULL",
      "subject_id": "INT NULL",
      "class": "INT NULL",
      "created_at": "TEXT NULL",
      "updated_at": "TEXT NULL",
      "learning_system": "TEXT NULL"
    }))
      .then((status) => createTable('notes', {
        "id": "INT",
        "subtopic_id": "INT NULL",
        "topic_id": "INT NULL",
        "notes": "TEXT NULL",
        "subject_id": "INT NULL",
        "class": "INT NULL",
        "created_at": "TEXT NULL",
        "updated_at": "TEXT NULL",
      }))
      .then(async (status) => {
        console.log(status);

        var topics = await search('topics');

        var notes = await search('notes');

        var subtopics = await search('subtopics');
        console.log("Topoics are" + topics.rows.length);

        console.log("Topoics are" + notes.rows.length);

        console.log("Topoics are" + subtopics.rows.length);
         if(topics.rows.length == 0){
           var notes = await this.getNotes();
           console.log(notes.topics[0]);
           await insert('notes', notes.notes);
           await insert('topics', notes.topics);
           await insert('subtopics', notes.subtopics);
         }
         
        
      });


  }

  async getNotes() {
    this.setState({loading: true});
    const access_token = await AsyncStorage.getItem('access_token');
    // const json = await axios.get('http://staging.angazaelimu.com/api/fetchAll', {
    // }, err => {
    //   console.log(error);
    // });
    // console.log(json);
    this.setState({loading: false})
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

        <Loader loading={this.state.loading} color="#235190" />
        <NavigationContainer linking={LinkingConfiguration}>

          <Stack.Navigator initialRouteName={this.state.initialPage}>
            <Stack.Screen options={options} name="Landing" component={Landing} />

            <Stack.Screen options={options} name="Login" component={LoginScreen} />

            <Stack.Screen options={options} name="Payments" component={PaymentScreen} />

            <Stack.Screen options={options} name="Account" component={AccountType} />

            <Stack.Screen options={options} name="Phone Confirm" component={PhoneConfirm} />

            <Stack.Screen options={options} name="Tab" component={BottomTab} />

            <Stack.Screen options={options} name="Pass" component={OneTimePassword} />

            
          </Stack.Navigator>


        </NavigationContainer>
      </View>

    );

  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
