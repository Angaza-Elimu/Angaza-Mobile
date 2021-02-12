import React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import Landing from './Landing';
import Subjects from './Subjects';
import Progress from './Progress';
import Notifications from './Notifications';
import Profile from './Profile';
const Tab = createBottomTabNavigator();


class BottomTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home';
                        } else if (route.name === 'Progress') {
                            iconName = focused
                                ? 'ios-pie'
                                : 'ios-pie';
                        }
                        else if (route.name === 'Notifications') {
                            iconName = focused
                                ? 'ios-notifications'
                                : 'ios-notifications';
                        }
                        else if (route.name === 'Profile') {
                            iconName = focused
                                ? 'ios-person'
                                : 'ios-person';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#2479AD',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Progress" component={Progress} />
                <Tab.Screen name="Notifications" component={Notifications} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        );
    }
}

export default BottomTab;