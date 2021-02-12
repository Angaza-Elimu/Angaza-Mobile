import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const studyImage = require("../assets/images/study.png");

        const { navigate, replace } = this.props.navigation;
        return (


                <LinearGradient
                    colors={["#2479AD", "#16ADA2", "#01FF90"]}
                    start={[0.7, 0.3]}
                    style={styles.gradientContainer}
                >
                <SafeAreaView style={styles.internalContainer}>
                    <View style={styles.pageContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>
                                Welcome to
                        </Text>
                            <Text style={styles.headingText}>
                                Angazaelimu
                        </Text>
                        </View>
                        <Image source={studyImage} style={styles.imageStyle} />
                        <View style={styles.narrativeContainer}>
                            <Text style={styles.narrativeText}>
                                A platform for personalized learning and discovery.
                        </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                navigate('Login')
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>SIGN IN</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                navigate('Account')
                            }

                            }>
                                <View style={styles.buttonWrap}>

                                    <Text style={styles.buttonText}>REGISTER</Text>
                                </View>
                            </TouchableHighlight>

                        </View>
                    </View>
                </SafeAreaView>

            </LinearGradient>

        );
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
    narrativeText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 30
    },
    buttonContainer: {
        padding: 30,
        justifyContent: "center",
        flexDirection:'row',
        width:'100%',
        alignItems: "center"
    },
    buttonStyle: {
        backgroundColor: '#2479AD',
        margin:10,
        paddingTop: 14,
        paddingBottom: 14,
        width: "50%",
        alignItems: "center",
        borderRadius: 14
    },
    buttonText: {
        color:'#fff'
    },
    pageContainer: {
        // flex:1,
        width: '100%',
        height: '100%',
        // flexDirection: 'column',
        alignItems: "center"
    }
});

export default Landing;