import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableHighlight, View, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
class PaymentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (

            <LinearGradient
                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                start={[0.7, 0.3]}
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollContentContainer}>
                        <View style={styles.card}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headingText}>Basic Plan</Text>
                                <Text style={styles.narrativeText}>Ksh.1000/YEAR</Text>
                            </View>
                            <View style={styles.contentContainer}>


                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                    this.subscribeToPlan(1)
                                }

                                }>
                                    <View style={styles.buttonWrap}>

                                        <Text style={styles.buttonText}>Subscribe</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <View style={styles.card}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headingText}>Best Value</Text>
                                <Text style={styles.narrativeText}>Ksh.500/TERM</Text>
                            </View>
                            <View style={styles.contentContainer}>


                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                    this.subscribeToPlan(2)
                                }

                                }>
                                    <View style={styles.buttonWrap}>

                                        <Text style={styles.buttonText}>Subscribe</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <View style={styles.card}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headingText}>Monthly</Text>
                                <Text style={styles.narrativeText}>Ksh.200/MONTH</Text>
                            </View>
                            <View style={styles.contentContainer}>


                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                    this.subscribeToPlan(3)
                                }

                                }>
                                    <View style={styles.buttonWrap}>

                                        <Text style={styles.buttonText}>Subscribe</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <View style={styles.card}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headingText}>Weekly</Text>
                                <Text style={styles.narrativeText}>Ksh.80/WEEK</Text>
                            </View>
                            <View style={styles.contentContainer}>


                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                    this.subscribeToPlan(4)
                                }

                                }>
                                    <View style={styles.buttonWrap}>

                                        <Text style={styles.buttonText}>Subscribe</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </ScrollView>
                </SafeAreaView>



            </LinearGradient>
        )
    }

    async subscribeToPlan(plan_id) {

        const { pop, replace } = this.props.navigation;
        const access_token = await AsyncStorage.getItem('access_token');
        const json = await axios.post('https://staging.angazaelimu.com/api/subscribeToPlan', {
            plan_id: plan_id
        }, {
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });
        console.log(json);
        if(json.data.status == 'Error'){
            ToastAndroid.show(json.data.message, ToastAndroid.LONG);
            pop()
        } else if(json.data.status == 'Success'){
            // ToastAndroid.show(json.data.message, ToastAndroid.LONG);
            pop();
        }
        // return json.data;
    }
}
const styles = StyleSheet.create({
    safeArea: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollViewContainer: {
        width: '100%',
        height: '100%'
    },
    scrollContentContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTextContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    gradientContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 20


    },
    headingText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 45,
        color: "#2479AD"
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
        fontWeight: '300',
        lineHeight: 45,
        color: '#2479AD'
    },
    inputText: {
        marginTop: 15,
        borderRadius: 10,
        width: 300,
        color: '#fff',
        padding: 14,

    },
    dropdownInput: {
        color: '#fff',
        marginTop: 8,
        paddingLeft: 14
    },
    buttonContainer: {
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
        width: '100%',
        height: '100%',
        alignItems: "center"
    }
});


export default PaymentScreen;