import React from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TextInput, Image, TouchableHighlight, Alert, AsyncStorage, Picker } from 'react-native';
import axios from 'axios';
import Loader from 'react-native-modal-loader';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


class PhoneConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            phone: '',
            student_class: '',
            password: '',
            firstname: props.route.params.first_name,
            lastname: props.route.params.last_name,
            username: props.route.params.username,
            email: props.route.params.email,
            learning_level: 'primary',
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
                                Confirm Phone
                        </Text>
                            <Text style={styles.headingText}>
                                Number
                        </Text>
                        </View>
                        <View style={styles.formContainer}>

                            <View style={styles.flexInput}>

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

                            <Ionicons name="md-key" size={20} color="white" style={styles.formIcons} />
                            <Text style={styles.dropdownInput}>Learning Level</Text>
                                <Picker
                                    selectedValue={this.state.learning_level}
                                    placeholder="Learning Level"
                                    style={{ margin: 20, width: 150, height: 25, color: '#fff' }}
                                    onValueChange={(value) => {
                                        this.setState({ learning_level: value });
                                    }}
                                >
                                    <Picker.Item label="Primary" value="primary"/>
                                    <Picker.Item label="Secondary" value="secondary"/>
                                </Picker>

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

                            </View>





                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                this.registerAttempt()
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>Register</Text>
                                </View>
                            </TouchableHighlight>


                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    registerAttempt() {


        const { navigate, replace } = this.props.navigation;
        console.log(
            {
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                class: this.state.student_class,
                phone: this.state.phone,
                learning_level: this.state.learning_level,
                user_type: 'student'
            }
        )
        this.setState({ loading: true })
        axios.post('http://staging.angazaelimu.com/api/auth/signup', {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            class: '7',
            phone: this.state.phone,
            learning_level: this.state.learning_level,
            email: this.state.email,
            user_type: 'student'
        }).then((resp) => {
            console.log(resp.data);
            let response = resp.data.login_data;
            console.log(response);
            if (response.access_token !== undefined) {
                if (resp.data.user.user_type == 'student') {

                    console.log("Follows is response");
                    console.log(resp.data);
                    AsyncStorage.setItem('access_token', response.access_token);
                    AsyncStorage.setItem('username', resp.data.user.username);
                    // AsyncStorage.setItem('class', resp.data.user.class);
                    AsyncStorage.setItem('learning_system', resp.data.user.learning_system);
                    // AsyncStorage.setItem('email', resp.data.user.email);
                    replace('Pass', {
                        phone_number: this.state.phone
                    });
                } else {
                    console.log("Got Here")
                }
                this.setState({ loading: false });
            } else {
                console.log(response);
                console.log("Got Here 2");
                this.setState({ loading: false })
            }
            this.setState({loading:false})
        }, err => {
            this.setState({loading:false});
            console.log(err);
            Alert.alert("Error Registering Account", "Kindly contact support");
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
        width: 300,
        color: '#fff',
        padding: 14,

    },
    dropdownInput:{
        color: '#fff',
        marginTop: 8,
        paddingLeft:14
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

export default PhoneConfirm;