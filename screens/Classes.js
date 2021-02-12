import * as React from 'react';
import { Image, StyleSheet, Text, ScrollView, TouchableOpacity, View, AsyncStorage } from 'react-native';

import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from 'react-native-safe-area-context';
class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectId: props.route.params.subjectId,
            pageTo: props.route.params.pageTo,
            learning_level: null
        };
    }

    componentDidMount() {

        this.getLearningLevel();
    }
    getLearningLevel() {
        AsyncStorage.getItem('learning_system').then(response => {
            this.setState({ learning_level: response })
        })
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
                            <Text style={styles.headingText}>
                                Select
                            </Text>
                            <Text style={styles.headingText}>
                                Class
                            </Text>

                            <View style={styles.profileContainer}>
                                <Image source={profileImage} style={styles.profileImage} />

                            </View>
                        </View>

                    </View>
                    {this.state.learning_level == 'primary' ? <ScrollView style={styles.screenMain}>

                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 1
                                })
                            }}>
                                <Text style={styles.subjectText}>Grade 1</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 2
                                })
                            }}>
                                <Text style={styles.subjectText}>Grade 2</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 3
                                })
                            }}>
                                <Text style={styles.subjectText}>Grade 3</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 4
                                })
                            }}>
                                <Text style={styles.subjectText}>Grade 4</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 5
                                })
                            }}>
                                <Text style={styles.subjectText}>Class 5</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 6
                                })
                            }}>
                                <Text style={styles.subjectText}>Class 6</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 7
                                })
                            }}>
                                <Text style={styles.subjectText}>Class 7</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={["#2479AD", "#01FF90"]}
                            start={[0.5, 0.3]} style={styles.card1}>
                            <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                navigate(this.state.pageTo, {
                                    subjectId: this.state.subjectId,
                                    class: 8
                                })
                            }}>
                                <Text style={styles.subjectText}>Class 8</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                    </ScrollView> : <ScrollView style={styles.screenMain}>

                            <LinearGradient colors={["#2479AD", "#01FF90"]}
                                start={[0.5, 0.3]} style={styles.card1}>
                                <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                    navigate(this.state.pageTo, {
                                        subjectId: this.state.subjectId,
                                        class: 9
                                    })
                                }}>
                                    <Text style={styles.subjectText}>Form 1</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient colors={["#2479AD", "#01FF90"]}
                                start={[0.5, 0.3]} style={styles.card1}>
                                <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                    navigate(this.state.pageTo, {
                                        subjectId: this.state.subjectId,
                                        class: 10
                                    })
                                }}>
                                    <Text style={styles.subjectText}>Form 2</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient colors={["#2479AD", "#01FF90"]}
                                start={[0.5, 0.3]} style={styles.card1}>
                                <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                    navigate(this.state.pageTo, {
                                        subjectId: this.state.subjectId,
                                        class: 11
                                    })
                                }}>
                                    <Text style={styles.subjectText}>Form 3</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient colors={["#2479AD", "#01FF90"]}
                                start={[0.5, 0.3]} style={styles.card1}>
                                <TouchableOpacity style={styles.touchableFit} onPress={() => {
                                    navigate(this.state.pageTo, {
                                        subjectId: this.state.subjectId,
                                        class: 12
                                    })
                                }}>
                                    <Text style={styles.subjectText}>Form 4</Text>
                                </TouchableOpacity>
                            </LinearGradient>


                        </ScrollView>}
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
            // alignItems: 'center',
            // justifyContent: 'center',
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
            lineHeight: 30,
            paddingRight: 4
        },
        headingContainer: {
            width: '100%',
            marginTop: 10,
            paddingTop: '10%',
            paddingBottom: '10%',
            paddingLeft: '8%',
            flexDirection: 'row'
        },
        profileContainer: {
            position: "absolute",
            marginTop: 40,
            right: 20

        }

    }
);


export default Classes;