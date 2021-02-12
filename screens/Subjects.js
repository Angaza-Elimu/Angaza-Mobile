import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import * as DataService from '../services/ContentRetrieval';
import { LinearGradient } from "expo-linear-gradient";

import Loader from 'react-native-modal-loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
class Subjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTo: props.route.params.pageTo,
            subjects: null,
            loading: false,
            learning_system: null
        };
        console.log(this.state.pageTo);
    }
    componentDidMount() {
        const { navigation } = this.props;
        // this.getSubjects()
        this.getLearningSystem();
        // this.setState({pageTo: navigation.getParam('pageTo')});
    }

    async getLearningSystem() {
        AsyncStorage.getItem('learning_system').then(response => {
            this.setState({ learning_system: response })
        })
    }

    getSubjects() {
        this.setState({ loading: true })
        AsyncStorage.getItem('learning_system').then(response => {
            console.log(response);
            DataService.retrieveSubjects(response).then(response => {
                console.log(response);
                this.setState({ subjects: response, loading: false })
            })

        })
    }
    render() {

        const profileImage = require("../assets/images/profile.png");

        const { navigate, replace, getParam } = this.props.navigation;
        const { navigation } = this.props;

        return (
            <LinearGradient
                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                start={[0.4, 0.1]}
                style={styles.gradientContainer}
            >

                <Loader loading={this.state.loading} color="#235190" />
                <SafeAreaView style={styles.internalContainer}>
                    <View style={styles.pageContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>
                                Select
                                </Text>
                                
                            <Text style={styles.headingText}>
                                Subject
                            </Text>

                            <View style={styles.profileContainer}>
                                <Image source={profileImage} style={styles.profileImage} />

                            </View>
                        </View>

                    </View>
                    {this.state.learning_system == 'primary' ? <ScrollView style={styles.screenMain}>
                        {/* <View style={styles.screenMain}> */}
                        <View style={styles.subjectRow}>
                            <TouchableOpacity style={styles.card1} onPress={() => {

                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 1
                                })

                            }}>
                                <Text style={styles.subjectText}>
                                    Mathematics
                  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 2
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    English
                  </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subjectRow}>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 3
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    Kiswahili
                  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 4
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    Science
                  </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subjectRow}>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 5
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    Social Studies
                  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 6
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    C.R.E
                  </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subjectRow}>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 7
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    I.R.E
                  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card1} onPress={() => {
                                navigate('Classes', {
                                    pageTo: this.state.pageTo,
                                    subjectId: 8
                                })
                            }}>
                                <Text style={styles.subjectText}>
                                    H.R.E
                  </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView> : <ScrollView style={styles.screenMain}>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {

                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 8
                                    })

                                }}>
                                    <Text style={styles.subjectText}>
                                        Mathematics
                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 9
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        English
                  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 10
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Kiswahili
                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 11
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Chemistry
                  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 12
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Biology
                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 13
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Physics
                  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 14
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        C.R.E
                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 15
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        I.R.E
                  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 19
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Geography
                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 20
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        History
                  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 21
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Computer
                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 17
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Business Studies
                  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.subjectRow}>
                                <TouchableOpacity style={styles.card1} onPress={() => {
                                    navigate('Classes', {
                                        pageTo: this.state.pageTo,
                                        subjectId: 18
                                    })
                                }}>
                                    <Text style={styles.subjectText}>
                                        Agriculture
                  </Text>
                                </TouchableOpacity>

                            </View>
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
            justifyContent: 'center',
            marginTop: 10
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
            flex: 0.5,
            margin: 10,
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
            // justifyContent: 'center',
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


export default Subjects;