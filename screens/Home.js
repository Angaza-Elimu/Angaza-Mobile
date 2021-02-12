// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, AsyncStorage, Alert } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";


import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };

    }
    componentWillMount() {

        const { navigate, replace } = this.props.navigation;
        AsyncStorage.getItem('username').then(response => {
            console.log(response);
            if (response == '' || response == undefined || response == null) {

                replace('Login');
                Alert.alert("You are not logged in",
                    "Your session has expired")
            } else {
                console.log("state set")
                this.setState({ username: response })
            }
        })
    }
    render() {
        console.log("notes opened");
        const profileImage = require("../assets/images/profile.png");
        const reviseImage = require("../assets/images/revise.png");

        const chatImage = require("../assets/images/chat.png");

        const teacherImage = require("../assets/images/teacher.png");
        const notesImage = require("../assets/images/notes.png");

        const { navigate, replace } = this.props.navigation;
        return (
            <LinearGradient
                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                start={[0.4, 0.1]}
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.internalContainer}>
                    <View style={styles.pageContainer}>
                        {/* <View style={styles.headerMenu}>
                            <Ionicons name="ios-menu" size={30} color="#fff" />
                        </View> */}
                        <View style={styles.headingContainer}>
                            <View style={styles.headingTextContainer}>

                                <Text style={styles.headingText}>
                                    Welcome Back,
                                </Text>
                                <Text style={styles.headingText}>
                                    {this.state.username}
                                </Text>
                            </View>
                            <View style={styles.profileContainer}>
                                <Image source={profileImage} style={styles.profileImage} />

                            </View>
                        </View>

                    </View>
                    <View style={styles.screenMain}>


                        <View style={styles.viewHeadingContainer}>
                            <Text style={styles.viewHeadingText}>Learn</Text>
                        </View>
                        <View style={styles.serviceContainer}>
                            <View style={styles.firstRow}>
                                <TouchableOpacity>

                                </TouchableOpacity>
                                <LinearGradient
                                    colors={["#2479AD", "#16ADA2", "#01FF90"]}
                                    start={[0.4, 0.1]} style={styles.learnButton}>
                                    <TouchableOpacity style={styles.touchableFill} onPress={() => {
                                        navigate('Subjects', {
                                            pageTo: 'Notes'
                                        })
                                    }}>
                                        <Image source={notesImage} style={styles.notesImage} />
                                        <Text style={styles.subjectText}>
                                            Notes
                                 </Text>
                                    </TouchableOpacity>

                                </LinearGradient>
                                <View style={styles.cardRow}>

                                    <View style={styles.smallerCards}>
                                        <TouchableOpacity style={styles.touchableFill} onPress={() => {
                                            navigate('Subjects', {
                                                pageTo: 'Assignments'
                                            }
                                            )
                                        }}>
                                            <Text style={styles.subjectText}>Assignments</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.smallerCards}>
                                        <TouchableOpacity style={styles.touchableFill} onPress={() => {
                                            navigate('Subjects', { pageTo: 'Quiz' })
                                        }}>
                                            <Text style={styles.subjectText}>Quizzes</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                            <LinearGradient
                                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                                start={[0.4, 0.1]} style={styles.revisionMaterial}>
                                <Image source={reviseImage} style={styles.reviseImage} />
                                <Text style={styles.subjectText}>
                                    Revision Material
                </Text>
                                <View></View>
                            </LinearGradient>
                            <LinearGradient
                                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                                start={[0.4, 0.1]} style={styles.revisionMaterial}>
                                <Image source={teacherImage} style={styles.reviseImage} />
                                <Text style={styles.subjectText}>
                                    Ask a Teacher
                </Text>
                                <View></View>
                            </LinearGradient>
                            <LinearGradient
                                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                                start={[0.4, 0.1]} style={styles.revisionMaterial}>
                                <Image source={chatImage} style={styles.reviseImage} />
                                <Text style={styles.subjectText}>
                                    Class Forum
                </Text>
                                <View></View>
                            </LinearGradient>

                        </View>
                    </View>

                </SafeAreaView>


            </LinearGradient>

        );
    }
}
const styles = StyleSheet.create(
    {
        firstRow: {
            flexDirection: 'row'
        },
        headerMenu: {
            marginLeft: 30,
            marginTop: 20,
            height: 30
        },
        cardRow: {
            flexDirection: 'column',
            marginLeft: 20,
            width: '50%',
        },
        cardLowerContainer: {
            width: '100%'
        },
        cardColumn: {
            flexDirection: 'row',
            // marginLeft: 20,
            justifyContent: 'center',
            width: '100%',
        },
        learnButton: {
            height: 125,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0E6CCB',
            borderRadius: 20
        },
        touchableFill: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
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
        smallerCardsRow: {
            height: 55,
            marginBottom: 10,
            flex: 0.5,
            margin: 10,
            borderRadius: 15,
            backgroundColor: '#2479AD',
            justifyContent: 'center',
            alignItems: 'center'
        },
        revisionMaterial: {
            width: '95%',
            height: 70,
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
            height: 70,
            width: 140,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0E6CCB',
            borderRadius: 20
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
            height: "80%",
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
            marginTop: "10%",
            paddingTop: '5%',
            paddingBottom: '8%',
            paddingLeft: '8%',
            
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


export default Home;