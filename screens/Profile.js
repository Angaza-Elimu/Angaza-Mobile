import * as React from 'react';
import { Image, StyleSheet, Text, Switch, TouchableHighlight, View, TextInput, AsyncStorage, ToastAndroid } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: '',
            email: '',
            username: '',
            phone: '',
            netState: '',
            isEnabled: false
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('netState').then(resp => {
            this.setState({ netState: resp })
            console.log(resp);
            if (resp = 'offline') {
                this.setState({ isEnabled: true })
            } else {

                this.setState({ isEnabled: false })
            }
        })
        AsyncStorage.getItem('username').then(resp => {
            this.setState({ username: resp })
        })
        AsyncStorage.getItem('phone').then(resp => {
            this.setState({ phone: resp })
        })
        AsyncStorage.getItem('email').then(resp => {
            this.setState({ email: resp })
        })

    }

    switchModes() {
        if (this.state.netState == 'online') {
            this.setState({ netState: 'offline', isEnabled: true });
            AsyncStorage.setItem('netState', 'offline');
        } else {
            this.setState({ netState: 'online', isEnabled: false });
            AsyncStorage.setItem('netState', 'online');
        }
    }
    switchToOfflineMode() {
        AsyncStorage.setItem('netState', 'offline');
        ToastAndroid.showWithGravity("You have switched to the offline mode", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
    switchToOnlineMode() {
        AsyncStorage.setItem('netState', 'offline');
    }
    toggleSwitch() {
        console.log(this.state.isEnabled);
        if (this.state.isEnabled == true) {
            console.log(this.state.netState);
            AsyncStorage.setItem('netState', 'offline');
            this.setState({ isEnabled: false });
        } else {
            console.log(this.state.netState);
            AsyncStorage.setItem('netState', 'online');
            this.setState({ isEnabled: true });
        }

    }
    render() {

        // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        const profileImage = require("../assets/images/profile.png");

        const { navigate, replace } = this.props.navigation;
        return (
            <LinearGradient
                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                start={[0.4, 0.1]}
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.internalContainer}>
                    <View style={styles.pageContainer}>
                        <View style={styles.headingContainer}>
                            <View style={styles.headingTextContainer}>
                                <Text style={styles.headingText}>
                                    Profile
              </Text>

                            </View>
                            <View style={styles.profileContainer}>
                                <Image source={profileImage} style={styles.profileImage} />

                            </View>
                        </View>

                    </View>
                    <View style={styles.screenMain}>

                        <View style={styles.planContainer}>
                            

                                <Text style={styles.planText}>Basic Plan</Text>
                                <Text style={styles.subplanText}>Expiry Date:30/9/2020</Text>
                          
                
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                navigate('Payments')
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>Select Plan</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.modeContainer}>

                            <Text style={styles.planText}>Offline Mode</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={this.state.isEnabled}
                                onValueChange={() => {
                                    if (this.state.isEnabled == true) {
                                        AsyncStorage.setItem('netState', 'offline');
                                        this.setState({ isEnabled: false });
                                        // ToastAndroid.showWithGravity("")
                                    } else {
                                        AsyncStorage.setItem('netState', 'online');
                                        this.setState({ isEnabled: true });
                                    }
                                }}
                            />

                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-person" size={20} color="#2479AD" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholderTextColor="#2479AD"
                                    autoCapitalize='none'
                                    value={this.state.username}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(username) => { this.setState({ username }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-call" size={20} color="#2479AD" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholderTextColor="#2479AD"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.phone}
                                    onChangeText={(password) => { this.setState({ password }) }}
                                />

                            </View>
                         
                        </View>
                       

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                AsyncStorage.removeItem('access_token');
                                replace('Login')
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>Log Out</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                </SafeAreaView>
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create(
    {
        firstRow: {
            flexDirection: 'row'
        },
        cardColumn: {
            flexDirection: 'column',
            marginLeft: 20,
            width: '50%',
        },
        subjectRow: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        fillView: {
            flex: 1,
            flexDirection: 'column'
        },
        planText: {
            fontSize: 20,
            color: '#2479AD'
        },
        subplanText: {
            fontSize: 15,
            color: '#2479AD'
        },
        touchableFit: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        planContainer: {
            width: '100%',
            margin: 30,
            paddingLeft: 30,
            width: '100%',
            alignContent: 'space-between'
        },
        buttonContainer: {
            justifyContent: "center",
            flexDirection: 'row',
            width: '100%',
            alignItems: "center"
        },
        formIcons: {
            bottom: -5,
            marginLeft: 20,
            marginRight: 20
        },
        subscribeButton: {
            backgroundColor: '#2479AD',
            margin: 10,
            paddingTop: 14,
            paddingBottom: 14,
            width: 80,
            alignItems: "center",
            borderRadius: 14
        },
        buttonStyle: {
            backgroundColor: '#2479AD',
            margin: 10,
            paddingTop: 14,
            paddingBottom: 14,
            width: "90%",
            alignItems: "center",
            borderRadius: 14
        },
        modeContainer: {
            padding: 30,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10
        },
        buttonText: {
            color: '#fff'
        },
        learnButton: {
            height: 125,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0E6CCB',
            borderRadius: 20
        },
        smallerCards: {
            width: '100%',
            height: 55,
            marginBottom: 10,
            borderRadius: 15,
            backgroundColor: '#2479AD',
            justifyContent: 'center',
            alignItems: 'center'
        },
        revisionMaterial: {
            width: '95%',
            height: 90,
            marginRight: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#0E6CCB',
            borderRadius: 20,
            marginTop: 20
        },
        notesImage: {
            height: 90,
            width: 90,

        },
        reviseImage: {
            height: 60,
            width: 60,
            marginLeft: 20,

        },
        internalContainer: {
            height: "100%",
            width: '100%'
        },
        viewHeadingContainer: {
            padding: 24,
            width: '100%',
            flexDirection: 'row'
        },
        serviceContainer: {
            height: '100%',
            width: '100%',
            paddingLeft: 20,
        },
        viewHeadingText: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#2479AD"
        },
        subjectText: {
            fontWeight: 'bold',
            color: '#fff',

        },
        card1: {
            height: 60,
            width: '90%',
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0E6CCB',
            borderRadius: 20
        },
        inputText: {
            marginTop: 15,
            borderRadius: 10,

            width: 300,
            padding: 14,

        },
        formContainer: {
            margin: 10,
            width: '85%'
        },
        flexInput: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'row',
            borderBottomColor: '#0ED09B',
            borderBottomWidth: 1,

        },
        card2: {
            height: 70,
            width: 140,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
            backgroundColor: '#38C2C7',
            borderRadius: 20
        },
        card3: {
            height: 70,
            width: 140,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
            backgroundColor: '#29A379',
            borderRadius: 20
        },
        card4: {
            height: 70,
            width: 140,

            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
            backgroundColor: '#70A016',
            borderRadius: 20
        },
        scrollView: {
            height: '15%',
            width: '100%',
            paddingLeft: 20
        },
        viewHeadingAlignRight: {
            right: 10,
            top: 10,
            margin: 20,

            color: "#2479AD",
            position: "absolute"
        },
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
        },
        screenMain: {
            width: "100%",
            backgroundColor: '#fff',
            alignItems: 'center',
            height: "100%",
            top: 40,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        gradientContainer: {
            width: '100%',
            height: '100%'
        },
        profileImage: {
            height: 40,
            width: 40
        },
        headingText: {
            fontSize: 24,
            color: '#fff',
            fontWeight: '600',
            lineHeight: 30
        },
        headingContainer: {
            width: '100%',
            height: '30%',
            marginTop: 10,
            paddingTop: '10%',
            paddingBottom: '10%',
            paddingLeft: '8%',
            flexDirection: 'row',
            flex: 1,
        },
        profileContainer: {
            position: "absolute",
            marginTop: 40,
            right: 20

        },
        headingTextContainer: {

        }

    }
);


export default Profile;