import React from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TextInput, Image, TouchableHighlight, Alert, AsyncStorage } from 'react-native';

import axios from 'axios';
import Loader from 'react-native-modal-loader';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
class AccountType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            student_class: 0
        };
    }
    render() {

        const { navigate, replace } = this.props.navigation;
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
                                User Details
                        </Text>
                            <Text style={styles.subtitle}>
                                Kindly fill in the following details
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
                                    autoCorrect={false}
                                    value={this.state.username}
                                    onChangeText={(username) => { this.setState({ username }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-mail" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Email Address"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.email}
                                    onChangeText={(email) => { this.setState({ email }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-person" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="First Name"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.first_name}
                                    onChangeText={(first_name) => { this.setState({ first_name }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-person" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Last Name"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.last_name}
                                    onChangeText={(last_name) => { this.setState({ last_name }) }}
                                />

                            </View>

                            {/* <View style={styles.flexInput}>

                                <Ionicons name="md-call" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Phone Number"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.phone}
                                    onChangeText={(phone) => { this.setState({ phone }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-bookmark" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Class"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.student_class}
                                    onChangeText={(student_class) => { this.setState({ student_class }) }}
                                />

                            </View>
                            <View style={styles.flexInput}>

                                <Ionicons name="md-key" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    value={this.state.password}
                                    onChangeText={(password) => { this.setState({ password }) }}
                                />

                            </View> */}

                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                this.nextPage();
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>NEXT</Text>
                                </View>
                            </TouchableHighlight>


                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    nextPage() {

        const { navigate, replace } = this.props.navigation;
        if (this.state.email !== '' && this.state.first_name !== '' && this.state.username !== '' && this.state.last_name !== '') {
            navigate('Phone Confirm', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                email: this.state.email
            });
        } else {
            
            Alert.alert("Empty Fields", "Kindly fill in all fields to proceed.");
        }

    }

    registerAttempt() {
        this.setState({ loading: true })
        axios.post('https://staging.angazaelimu.com/api/auth/signup', {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.first_name,
            lastname: this.state.last_name,
            class: this.state.student_class,
            phone: this.state.phone,
            user_type: 'student'
        }).then((resp) => {
            console.log(resp);
            let response = resp.data.login_data;
            console.log(response);
            if (response.access_token !== undefined) {
                if (resp.data.user.user_type !== 'student') {

                    AsyncStorage.setItem('access_token', response.access_token);
                    AsyncStorage.setItem('username', resp.data.user.username);
                    AsyncStorage.setItem('class', resp.data.user.class);
                    AsyncStorage.setItem('learning_system', resp.data.user.learning_system);
                    AsyncStorage.setItem('email', resp.data.user.email);
                    replace('Tab');
                } else {
                    console.log("Got Here")
                }
                this.setState({ loading: false });
            } else {
                console.log(response);
                console.log("Got Here 2");
                this.setState({ loading: false })
            }
        }, err => {
            console.log(err);
            this.setState({ loading: false });
            Alert.alert("Error registering account kindly check details");
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    subtitle: {
        paddingTop: 10,
        color: '#fff',
        paddingBottom: 10,
        fontSize: 16
    },
    gradientContainer: {
        width: '100%',
        height: '100%'
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
        width: '85%'
    },
    narrativeText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 30
    },
    inputText: {
        color:'#fff',
        marginTop: 15,
        borderRadius: 10,
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

export default AccountType;