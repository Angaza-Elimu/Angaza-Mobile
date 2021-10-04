import React from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, TouchableHighlight, ToastAndroid, AsyncStorage } from 'react-native';
import axios from 'axios';
import Loader from 'react-native-modal-loader';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: '',
            passwword: ''
        };
    }
    render() {

        const { navigate, replace, reset } = this.props.navigation;
        return (
            <LinearGradient
                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                start={[0.7, 0.3]}
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.internalContainer}>

                    <Loader loading={this.state.loading} color="#235190" />
                    <View style={styles.pageContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>
                                Sign In
                        </Text>

                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-person" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Username"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    value={this.state.username}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(username) => { this.setState({ username }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-key" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.password}
                                    onChangeText={(password) => { this.setState({ password }) }}
                                    secureTextEntry
                                />

                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                this.loginRequest();
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>SIGN IN</Text>
                                </View>
                            </TouchableHighlight>


                        </View>
                        <TouchableOpacity onPress={()=> {
                            this.navigateToRegister()
                        }}>
                            <Text style={styles.registerText}>Don't have an account yet? Register Here</Text>
                        </TouchableOpacity>
                       
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }


    navigateToRegister(){

        const { navigate, replace, reset } = this.props.navigation;
        replace('Account');
    }   
    // async loginRequest(){
    //     const { navigate, replace, reset } = this.props.navigation;
    //     navigate('Tab', {screen: 'Home'});
    // }
    async loginRequest() {
        this.setState({ loading: true });
        const { navigate, replace, reset } = this.props.navigation;
        if (this.state.username !== '' && this.state.password !== '') {
            let data = {
                username: this.state.username,
                password: this.state.password
            }
            console.log(data);
            axios.post('https://staging.angazaelimu.com/api/auth/login', {
                username: this.state.username,
                password: this.state.password
            }).then(async (resp) => {

                this.setState({ loading: false });
                let response = resp.data;
                console.log(response);
                if (response.access_token !== undefined) {
                    if (response.user_type !== 'student') {

                        await AsyncStorage.setItem('access_token', response.access_token);
                        await AsyncStorage.setItem('username', response.user.username);
                        await AsyncStorage.setItem('class', response.user.class);
                        await AsyncStorage.setItem('user_id', response.user.id.toString());
                        await AsyncStorage.setItem('learning_system', response.user.learning_system);
                        await AsyncStorage.setItem('email', response.user.email);
                        await AsyncStorage.setItem('phone', response.user.phone);
                        if (response.subscription.length < 1) {
                            ToastAndroid.show('Kindly subscribe to a plan to proceed', ToastAndroid.LONG);
                            replace('Payment')
                        } else {  
                            console.log(response.user);
                            navigate('Tab', {screen: 'Home'});
                        }
                    } else {
                        console.log("Got Here")
                    }

                } else {
                    console.log("Got Here 2");
                    // ToastAndroid.show("Unable to Login at the moment. Check Network connection")
                }

            }, err => {

                this.setState({ loading: false });
                console.log(err);
                if (err.response.status == 401) {
                    Alert.alert("Invalid Credentials", "Wrong Username and/or password");
                } else {
                    Alert.alert("Server Error", "Kindly contact support");
                }

            })
        } else {
            ToastAndroid.show("Kindly fill in all fields", ToastAndroid.LONG)
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    gradientContainer: {
        width: '100%',
        height: '100%'
    },
    registerText: {
        color: '#fff'
    },  
    headingText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '600',
        lineHeight: 45
    },
    formIcons: {
        bottom: -5,
        marginLeft: 20,
        marginRight: 20
    },
    headingContainer: {
        width: '100%',
        height: '30%',
        marginTop: 10,
        justifyContent: "center",
        padding: '10%'
    },
    narrativeContainer: {
        width: '100%',
        height: '20%',
        marginTop: 10,
        justifyContent: "center",
        padding: 30
    },
    formContainer: {
        margin: 10,
        width: '85%'
    },
    narrativeText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 30
    },
    inputText: {
        marginTop: 15,
        borderRadius: 10,
        color: '#fff',
        width: 300,
        padding: 14,

    },
    buttonContainer: {
        padding: 30,
        justifyContent: "center",
        flexDirection: 'row',
        width: '100%',
        alignItems: "center"
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
    buttonText: {
        color: '#fff'
    },
    flexInput: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        borderBottomColor: '#0ED09B',
        borderBottomWidth: 1,

    },
    pageContainer: {
        // flex:1,
        width: '100%',
        height: '100%',
        // flexDirection: 'column',
        alignItems: "center"
    }
});

export default LoginScreen;