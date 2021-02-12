import React from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import axios from 'axios';
import Loader from 'react-native-modal-loader';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


class OneTimePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            phone: props.route.params.phone,
            otp:''
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
                                One Time
                        </Text>
                            <Text style={styles.headingText}>
                                Password
                        </Text>

                        <Text style={styles.subtitle}>
                                Kindly insert PIN sent to registered phone number. 
                        </Text>
                        </View>
                        <View style={styles.formContainer}>

                            <View style={styles.flexInput}>

                                <Ionicons name="md-key" size={20} color="white" style={styles.formIcons} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="PIN"
                                    placeholderTextColor="#fff"
                                    keyboardType="numeric"
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    value={this.state.otp}
                                    onChangeText={(otp) => { this.setState({ otp }) }}
                                />

                            </View>







                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                this.confirmAttempt()
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>Confirm Phone Number</Text>
                                </View>
                            </TouchableHighlight>


                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    confirmAttempt() {

        const { navigate, dispatch } = this.props.navigation;
       
        
        
        this.setState({ loading: true })
        axios.post('http://staging.angazaelimu.com/api/auth/confirmPhone', {
           
            phone: this.state.phone,
            confirmation_code: this.state.otp
        }).then((response) => {
            // console.log(response.data)
            let resp = response.data;
            console.log(resp)
            if(resp.status == 'ok'){
                this.setState({ loading: false })
                navigate('Tab');
            } else if(resp.status == 'unconfirmed'){

                this.setState({ loading: false })
                Alert.alert("Invalid OTP code", "Enter correct code")
                
            }
            else {

                this.setState({ loading: false })
                Alert.alert("Unable to register Account", "Check your network connection");
            }

            this.setState({ loading: false })
            // console.log(response);
            
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

export default OneTimePassword;