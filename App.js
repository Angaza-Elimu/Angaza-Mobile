import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StyleSheet, View, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NetworkProvider } from 'offline-sync-react';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeScreen from './screens/HomeScreen';
import Landing from './screens/Landing';
import LoginScreen from './screens/LoginScreen';
import AccountType from './screens/AccountType';
import BottomTab from './screens/BottomTab';
import PhoneConfirm from './screens/PhoneConfirm';
import OneTimePassword from './screens/OneTimePassword';

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
