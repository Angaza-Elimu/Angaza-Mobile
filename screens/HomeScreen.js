// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Subjects from './Subjects';
import Classes from './Classes';
import Notes from './Notes';
import Quiz from './Quiz';
import Assignment from './Assignment';



const Stack = createStackNavigator();
const options = {
  //To hide the ActionBar/NavigationBar
  headerShown: false
};


export default class HomeScreen extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={options} name="Home" component={Home} />

          <Stack.Screen options={options} name="Subjects" component={Subjects} />

          <Stack.Screen options={options} name="Classes" component={Classes} />

          <Stack.Screen options={options} name="Notes" component={Notes} />

          <Stack.Screen options={options} name="Quiz" component={Quiz} />

          <Stack.Screen options={options} name="Assignments" component={Assignment} />
          {/* 
        <Stack.Screen options={options} name="Revision" component={RevisionMaterial} />

        <Stack.Screen options={options} name="RevisionMaterial" component={RevisionMaterial} />

        <Stack.Screen options={options} name="RevisionSubjects" component={RevisionSubjects} /> */}

        </Stack.Navigator>


      </NavigationContainer>

    );
  }



}

HomeScreen.navigationOptions = {
  header: null,
};

