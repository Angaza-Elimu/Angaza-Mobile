import React from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, Modal, Image, TouchableHighlight, Picker, Alert, ToastAndroid } from 'react-native';
import HTML from "react-native-render-html";
import AutoHeightWebView from 'react-native-autoheight-webview';

import { search, executeSql } from 'expo-sqlite-query-helper';
import Loader from 'react-native-modal-loader';
import * as DataService from '../services/ContentRetrieval';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class: props.route.params.class,
            subject_id: props.route.params.subjectId,
            questions: [],
            topics: [],
            subtopics: [],
            loading: null,
            answer: null,
            checkAnswer: false,
            selectedTopic: null,
            question_answered: false,
            highlight_option: null,
            modalVisible: false,
            current_index: 0,
            current_score: 0,
            current_question: {
            }
        };
    }

    getQuestions(value) {
        this.setState({ loading: true })
        DataService.retrieveQuiz(value, 'quizq_questions').then(response => {
            console.log(response)
            // console.log(response)
            this.setState({ questions: response, current_question: response[this.state.current_index], loading: false })
        }, err => {
            this.setState({ loading: false });
            ToastAndroid.showWithGravity("Network connection error", ToastAndroid.LONG, ToastAndroid.CENTER);
            console.log(err);
        })
    }
    componentDidMount() {
        this.getTopics();
        console.log(this.state.class)
        console.log(this.state.subject_id)
    }

    answerQuestion(option_id) {
        if (this.state.question_answered == false) {
            if (this.state.current_question.answer == option_id) {
                this.setState({ question_answered: true, highlight_option: option_id })
                DataService.answerQuestion(this.state.subject_id, this.state.subtopic_id, 1, option_id, this.state.current_question.id, 0, 'question_answers').then(response => {
                    this.setState({ question_answered: true, current_score: this.state.current_score + 1});

                    ToastAndroid.showWithGravity("Answer Correct", ToastAndroid.SHORT, ToastAndroid.TOP );
                    console.log(response);
                })
            } else {
                this.setState({ question_answered: true, highlight_option: option_id })
                DataService.answerQuestion(this.state.subject_id, this.state.subtopic_id, 1, option_id, this.state.current_question.id, 0, 'question_answers').then(response => {
                    this.setState({ question_answered: true })

                    ToastAndroid.showWithGravity("Answer Wrong", ToastAndroid.SHORT, ToastAndroid.TOP );
                    console.log(response);
                })
            }
        } else {
            Alert.alert("", "Question already answered.")
        }


    }
    checkAnswer() {
        if (this.state.highlight_option == null) {
            Alert.alert("", "Answer question first")
        } else {
            this.setState({ modalVisible: true });
        }
    }
    nextQuestion() {
        let { navigate } = this.props.navigation;
        console.log("Questions Length: " + this.state.questions.length);

        console.log("Index: " + this.state.current_index);
        if (this.state.question_answered == true && this.state.current_index != this.state.questions.length - 1) {

            this.setState({ question_answered: false, highlight_option: null })
            this.setState({ current_index: this.state.current_index + 1, highlight_option: null, question_answered: false, current_question: this.state.questions[this.state.current_index + 1] })
        } else if (this.state.question_answered == true && this.state.current_index == this.state.questions.length - 1) {
            Alert.alert("", "Questions Complete. Score: " + this.state.current_score + "/" + this.state.questions.length);
            navigate('Home');

        } else {
            Alert.alert("", "Kindly answer the question")
        }
    }

    render() {
        return (
                <LinearGradient
                    colors={["#2479AD", "#16ADA2", "#01FF90"]}
                    start={[0.4, 0.1]}
                    style={styles.gradientContainer}
                >
                    <SafeAreaView style={styles.internalContainer}>

                        <Loader loading={this.state.loading} color="#235190" />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                // Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    {this.state.current_question ? <HTML html={this.state.current_question.additional_notes} /> : <View><Text>No Additional Notes</Text></View>}
                                    <TouchableHighlight
                                        style={styles.buttonStyle}
                                        onPress={() => {
                                            this.setState({ modalVisible: false })
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.pageContainer}>


                        </View>

                        {this.state.checkAnswer == false ? <View style={styles.screenMain}>
                            <View style={styles.headerRow}>
                                <View style={styles.headerRow}>
                                    <Picker
                                        selectedValue={this.state.selectedTopic}
                                        placeholder="Topics"
                                        style={{ margin: 20, width: 150 }}
                                        onValueChange={(value) => {

                                            this.setState({ selectedTopic: value });
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
                                        style={{ margin: 20, width: 150 }}
                                        onValueChange={(value) => {

                                            this.setState({ selectedsubTopic: value });
                                            this.getQuestions(value)
                                        }}
                                    ><Picker.Item label="Select Subtopic" value="0" key="1" />
                                        {this.state.subtopics.length > 0 ? this.state.subtopics.map((item, index) => {
                                            return (<Picker.Item label={item.subtopic_name} value={item.id} key={index} />)
                                        }) : <Picker.Item label="No topics loaded" value="0" key="1" />}
                                    </Picker>
                                </View>
                            </View>
                            <ScrollView>
                                {this.state.current_question.question !== null && this.state.questions.length > 0 ? <View style={styles.webViewContainer}>
                                    <View style={styles.questionContainer}>
                                        <HTML html={this.state.current_question.question} />
                                    </View>
                                    {this.state.highlight_option !== 1 ? <TouchableOpacity style={styles.questionContainer} onPress={() => {
                                        this.answerQuestion(1)
                                    }}>
                                        <Text style={styles.optionChoice}>
                                            A.
                                </Text>

                                        <HTML html={this.state.current_question.option_a} />
                                    </TouchableOpacity> : <TouchableOpacity style={styles.highlightedContainer} onPress={() => {
                                        this.answerQuestion(1)
                                    }}>
                                            <Text style={styles.optionChoice}>
                                                A.
                                </Text>

                                            <HTML html={this.state.current_question.option_a} />
                                        </TouchableOpacity>}
                                    {this.state.highlight_option !== 2 ? <TouchableOpacity style={styles.questionContainer} onPress={() => {
                                        this.answerQuestion(2)
                                    }}>
                                        <Text style={styles.optionChoice}>
                                            B.
                                </Text>

                                        <HTML html={this.state.current_question.option_b} />
                                    </TouchableOpacity> : <TouchableOpacity style={styles.highlightedContainer} onPress={() => {
                                        this.answerQuestion(2)
                                    }}>
                                            <Text style={styles.optionChoice}>
                                                B.
                                </Text>

                                            <HTML html={this.state.current_question.option_b} />
                                        </TouchableOpacity>}
                                    {this.state.highlight_option !== 3 ? <TouchableOpacity style={styles.questionContainer} onPress={() => {
                                        this.answerQuestion(3)
                                    }}>
                                        <Text style={styles.optionChoice}>
                                            C.
                                </Text>

                                        <HTML html={this.state.current_question.option_c} />
                                    </TouchableOpacity> : <TouchableOpacity style={styles.highlightedContainer} onPress={() => {
                                        this.answerQuestion(3)
                                    }}>
                                            <Text style={styles.optionChoice}>
                                                C.
                                </Text>

                                            <HTML html={this.state.current_question.option_c} />
                                        </TouchableOpacity>}
                                    {this.state.highlight_option !== 4 ? <TouchableOpacity style={styles.questionContainer} onPress={() => {
                                        this.answerQuestion(4)
                                    }}>
                                        <Text style={styles.optionChoice}>
                                            D.
                                </Text>

                                        <HTML html={this.state.current_question.option_d} />
                                    </TouchableOpacity> : <TouchableOpacity style={styles.highlightedContainer} onPress={() => {
                                        this.answerQuestion(4)
                                    }}>
                                            <Text style={styles.optionChoice}>
                                                D.
                                </Text>

                                            <HTML html={this.state.current_question.option_d} />
                                        </TouchableOpacity>}
                                    <View style={styles.bottomContainer}>
                                        <View style={styles.buttonContainer}>
                                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                                this.checkAnswer();
                                            }

                                            }>
                                                <View style={styles.buttonWrap}>

                                                    <Text style={styles.buttonText}>Check Answer</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>

                                        <View style={styles.buttonContainer}>
                                            <TouchableHighlight style={styles.buttonStyle} onPress={() => {
                                                this.nextQuestion();
                                            }

                                            }>
                                                <View style={styles.buttonWrap}>

                                                    <Text style={styles.buttonText}>Next Question</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View> : <View style={styles.centerInstruction}>
                                        <Text>
                                            Select Topic and Subtopic to load content
                                    </Text>
                                    </View>}
                            </ScrollView>


                        </View> : <View></View>}

                    </SafeAreaView>
                </LinearGradient>
                )
        
            }
    getTopics() {
                    //fetch or check local sqlite based on configvalue
                    console.log(this.state.netState);
        this.setState({loading: true });
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
                this.setState({topics: rows.rows._array });
                this.setState({loading: false });
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
    }
    const styles = StyleSheet.create(
    {
                    firstRow: {
                    flexDirection: 'row'
            },
        centeredView: {
                    flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22
            },
        modalView: {
                    margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
            shadowOffset: {
                    width: 0,
                height: 2
            },
            width: '92%',
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        questionContainer: {
                    flexDirection: 'row',
                alignItems: 'center',
                margin: 10
            },
        highlightedContainer: {
                    flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
                borderRadius: 10,
                borderColor: '#2479AD',
                borderWidth: 2
            },
        optionChoice: {
                    fontSize: 20,
                color: '#fff',
                backgroundColor: '#2479AD',
                padding: 10,
                borderRadius: 10,
                marginRight: 20,
                marginLeft: 20,
            },
        contentText: {
                    color: '#2479AD',
                fontSize: 25,
                padding: 10
            },
        centerInstruction: {
                    alignItems: 'center',
                justifyContent: 'center',
                height: '70%'
            },
        headerRow: {
                    flexDirection: 'row',
                height: '10%',
                width: '100%',
                alignItems: 'center'
            },
        questionContent: {
                    width: '100%',
    
                backgroundColor: '#82489d'
            },
        optionText: {
                    fontSize: 16
            },
        bottomContainer: {
                    flexDirection: 'row',
                justifyContent: "center",
                alignItems: 'center'
            },
        buttonContainer: {
                    justifyContent: "center",
                flexDirection: 'row',
                width: '50%',
                alignItems: "center"
            },
        formIcons: {
                    bottom: -5,
                marginLeft: 20,
                marginRight: 20
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
        webViewDimensions: {
                    width: '100%',
                height: 150,
                backgroundColor: '#000'
            },
        cardColumn: {
                    flexDirection: 'column',
                marginLeft: 20,
                width: '50%',
            },
        webViewContainer: {
                    width: '100%',
                height: '100%'
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
            
export default Quiz;