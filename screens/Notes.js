import React from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TextInput, Image, Picker, TouchableHighlight, AsyncStorage, ToastAndroid } from 'react-native';
// import { Picker } from '@react-native-community/picker';
import { WebView } from 'react-native-webview';
import * as DataService from '../services/ContentRetrieval';
import Loader from 'react-native-modal-loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { search, executeSql } from 'expo-sqlite-query-helper';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            netState: '',
            class: props.route.params.class,
            subject_id: props.route.params.subjectId,
            loading: false,
            notes: null,
            selectedTopic: 1,
            selectedsubTopic: null,
            topics: [],
            subtopics: []
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('netState').then(response => {
            this.setState({ netState: response });

            this.getTopics();
        });

        console.log("Mounted")
    }



    render() {
        let selectedValue = "";
        const profileImage = require("../assets/images/profile.png");
        const { navigate, replace } = this.props.navigation;
        return (

            <LinearGradient
                colors={["#2479AD", "#16ADA2", "#01FF90"]}
                start={[0.4, 0.1]}
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.internalContainer}>
                    <Loader loading={this.state.loading} color="#235190" />
                    <View style={styles.screenMain}>
                        <View style={styles.headerRow}>
                            <Picker
                                selectedValue={this.state.selectedTopic}
                                placeholder="Topics"
                                style={{ margin: 20, width: 300, }}
                                onValueChange={(value) => {

                                    this.setState({ selectedTopic: value, notes:null});
                                    this.getSubtopics(value)
                                }}
                            ><Picker.Item label="Select Topic" value="0" key="1" />
                                {this.state.topics.length > 0 ? this.state.topics.map((item, index) => {
                                    return (<Picker.Item label={item.topic_name} value={item.id} key={index} />)
                                }) : <Picker.Item label="No topics loaded" value="0" key="1" />}
                            </Picker>
                            <Picker
                                selectedValue={this.state.selectedsubTopic}
                                placeholder="Subtopic"
                                style={{ margin: 20, width: 300 }}
                                onValueChange={(value) => {

                                    this.setState({ selectedsubTopic: value });
                                    this.getNotes(value)
                                }}
                            ><Picker.Item label="Select Subtopic" value="0" key="1" />
                                {this.state.subtopics != [] > 0 ? this.state.subtopics.map((item, index) => {
                                    return (<Picker.Item label={item.subtopic_name} value={item.id} key={index} />)
                                }) : <Picker.Item label="No topics loaded" value="0" key="1" />}
                            </Picker>
                        </View>
                        <View style={styles.webViewContainer}>

                            {this.state.notes !== null ? <WebView style={styles.webViewDimensions} source={{ html: this.state.notes }}>

                            </WebView> : <View></View>}
                        </View>

                    </View>
                </SafeAreaView>
            </LinearGradient>
        )

    }

    getTopics() {
        //fetch or check local sqlite based on configvalue
        console.log(this.state.netState);
        this.setState({ loading: true });
        if (this.state.netState == 'online') {
            DataService.retrieveTopics(this.state.class, this.state.subject_id).then(response => {

                this.setState({ topics: response });
                this.setState({ loading: false });
            })
        } else {
            console.log(
                {
                    class: this.state.class, subject_id: this.state.subject_id
                }
            )
            executeSql('SELECT * FROM topics WHERE class=' + this.state.class + ' AND subject_id=' + this.state.subject_id).then((rows) => {

                console.log(rows);
                this.setState({ topics: rows.rows._array });
                this.setState({ loading: false });
            });


        }
    }
    getSubtopics(topic_id) {
        //fetch or check db based on config value
        this.setState({ loading: true });
        console.log(topic_id);
        if (this.state.netState == 'online') {
            DataService.retrieveSubtopics(topic_id).then(response => {
                this.setState({ subtopics: response.rows });
                this.setState({ loading: false });
            })
        } else {
            executeSql('SELECT * FROM subtopics WHERE topic_id=' + topic_id).then((rows) => {
                console.log(rows);
                this.setState({ subtopics: rows.rows._array });
                this.setState({ loading: false });
            });
        }


    }
    getNotes(subtopic_id) {
        //fetch or check db based on config value
        this.setState({ loading: true });
        if (this.state.netState == 'online') {
            DataService.retrieveNotes(subtopic_id).then(response => {
                console.log(response);
                this.setState({ notes: `<meta name="viewport" content="width=device-width, initial-scale=1"> <body>` + response[0].notes + `</body>` })
                console.log(this.state.notes);
                this.setState({ loading: false });
            });
        } else {
            search(
                'notes', {
                subtopic_id: subtopic_id
            }
            ).then((rows) => {
                console.log(rows.rows.length);
                if (rows.rows.length > 0) {
                    this.setState({ notes: `<meta name="viewport" content="width=device-width, initial-scale=1"> <body>` + rows.rows._array[0].notes + `</body>` })
                    this.setState({ loading: false });
                } else {
                    ToastAndroid.showWithGravity("No notes available", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                }
            });
            this.setState({ loading: false });
        }
    }
}
const styles = StyleSheet.create(
    {
        firstRow: {
            flexDirection: 'row'
        },
        headerRow: {
            flexDirection: 'column',
            height: '10%',
            width: '100%'

        },
        webViewDimensions: {
            width: 400,
            height: 300,
            padding: 10,
            marginBottom: 20,
            backgroundColor: '#f5f5f5'
        },
        cardColumn: {
            flexDirection: 'column',
            marginLeft: 20,
            width: '50%',
        },
        webViewContainer: {
            width: '100%',
            height: '80%'
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
            height: "100%",
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

export default Notes;