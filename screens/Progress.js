import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, AsyncStorage } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';
class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

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
                                   Progress
              </Text>

                            </View>
                            <View style={styles.profileContainer}>
                                <Image source={profileImage} style={styles.profileImage} />

                            </View>
                        </View>

                    </View>
                    <View style={styles.screenMain}>


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
        touchableFit: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
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
            justifyContent: 'center',
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


export default Progress;