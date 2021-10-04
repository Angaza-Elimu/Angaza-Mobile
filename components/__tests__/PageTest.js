import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import {TouchableOpacity } from 'react-native';
import { MonoText } from '../StyledText';
import Quiz from '../../screens/Quiz';

import { View, StyleSheet, Text, TextInput, Image, Picker, TouchableHighlight, AsyncStorage, ToastAndroid } from 'react-native';
import Classes from '../../screens/Classes';
import HomeScreen from '../../screens/HomeScreen';
import Notes from '../../screens/Notes';
import Subjects from '../../screens/Subjects';
import Home from '../../screens/Home';
import Assignment from '../../screens/Assignment';
// import { render } from 'react-dom';
import Progress from '../../screens/Progress';
import Enzyme, { shallow, render, mount } from 'enzyme';
import * as DataService from '../../services/ContentRetrieval';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
// import { }

Enzyme.configure({ adapter: new Adapter() })

const createTestProps = (props) => ({

    ...props
});

const mockPicker = class MockPicker extends React.Component {
    static Item = props => React.createElement('Item', props, props.children);
    static propTypes = { children: React.propTypes };
  
    render() {
      return React.createElement('Picker', this.props, this.props.children);
    }
  };

it(`renders correctly`, () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(tree).toMatchSnapshot();
});


describe("rendering", () => {
    var props;
    var navigation = {

    }
    beforeEach(() => {
        props = createTestProps({});
    })


    it(`Secondary Subject renders correctly`, async () => {
        const getSubjects = jest.fn();
        const getLearningSystem = jest.fn();
        let route = {
            params: {
                class: 1,
                subject_id: 1,
                learning_system: 'secondary',
            }
        }
        const subjectScreen = await renderer.create(<Subjects navigation={navigation} route={route} getSubjects={getSubjects} getLearningSystem={getLearningSystem} />);
        let tree = subjectScreen.toJSON();
        // subjectScreen.find('TouchableOpacity').simulate('click')
        subjectScreen.getInstance().getLearningSystem();
        subjectScreen.getInstance().getSubjects();
        subjectScreen.getInstance().render();
        subjectScreen.getInstance().componentDidMount();
        // subjectScreen.getInstance().navigateTo();
        
        subjectScreen.getInstance().setState({ learning_system: 'secondary' });
        subjectScreen.update();
        expect(subjectScreen).toMatchSnapshot();

        // expect(getLearningSystem).toHaveBeenCalled();

    })
    it(`Primary Subject renders correctly`, async () => {
        const getSubjects = jest.fn();
        const getLearningSystem = jest.fn();
        let route = {
            params: {
                class: 1,
                subject_id: 1,
                learning_system: 'primary',
                pageTo: 'subject'
            }
        }
        const subjectScreen = await renderer.create(<Subjects navigation={navigation} route={route} />);
        // subjectScreen.find('TouchableOpacity').simulate('click')
        subjectScreen.getInstance().getLearningSystem();
        subjectScreen.getInstance().getSubjects();
        subjectScreen.getInstance().render();
        subjectScreen.getInstance().componentDidMount();
        // subjectScreen.getInstance().navigateTo();
        let tree = subjectScreen.toJSON();

        subjectScreen.getInstance().setState({ learning_system: 'primary' });
        // subjectScreen.update();
        expect(subjectScreen).toMatchSnapshot();

    })
    it(`Primary Notes renders correctly`, async () => {
        jest.mock('@react-native-community/picker', () => {
            const React = require('React')
            const RealComponent = jest.requireActual('@react-native-community/picker')
          
            class Picker extends React.Component {
              static Item = (props: { children: never }) => {
                return React.createElement('Item', props, props.children)
              }
          
              render () {
                return React.createElement('Picker', this.props, this.props.children)
              }
            }
          
            Picker.propTypes = RealComponent.propTypes
            return {
              Picker
            }
          })
        const getSubjects = jest.fn();
        // jest.mock('Picker', () => mockPicker);
        const getLearningSystem = jest.fn();
        let route = {
            params: {
                class: 1,
                subject_id: 1,
                learning_system: 'primary',
            }
        }
        const notes = await renderer.create(<Notes navigation={navigation} route={route} getSubjects={getSubjects} getLearningSystem={getLearningSystem} />);
        
        notes.getInstance().getTopics();
        notes.getInstance().getSubtopics();
        notes.getInstance().getNotes();
        // console.log(tree);

        
        notes.getInstance().getTopics();
        notes.getInstance().getSubtopics();
        notes.getInstance().getNotes();
        expect(notes).toMatchSnapshot();
    })
    it(`Secondary Notes renders correctly`, async () => {
        jest.mock('@react-native-community/picker', () => {
            const React = require('React')
            const RealComponent = jest.requireActual('@react-native-community/picker')
          
            class Picker extends React.Component {
              static Item = (props: { children: never }) => {
                return React.createElement('Item', props, props.children)
              }
          
              render () {
                return React.createElement('Picker', this.props, this.props.children)
              }
            }
          
            Picker.propTypes = RealComponent.propTypes
            return {
              Picker
            }
          })
        const getSubjects = jest.fn();
        // jest.mock('Picker', () => mockPicker);
        const getLearningSystem = jest.fn();
        let route = {
            params: {
                class: 1,
                subject_id: 1,
                learning_system: 'primary',
            }
        }
        const notes = await renderer.create(<Notes navigation={navigation} route={route} getSubjects={getSubjects} getLearningSystem={getLearningSystem} />);
        
        notes.getInstance().getTopics();
        notes.getInstance().getSubtopics();
        notes.getInstance().getNotes();
        // console.log(tree);
    })
    it(`Assignment renders correctly`, async () => {
        let route = {
            params: {
                class: 1,
                subject_id: 1,
                question_answered: true,
            }
        }
        jest.mock(
            'react-native/Libraries/Components/Touchable/TouchableOpacity.js',
            () => {
              const { TouchableHighlight } = require('react-native')
              const MockTouchable = props => {
                return <TouchableHighlight {...props} />
              }
              MockTouchable.displayName = 'TouchableOpacity'
          
              return MockTouchable
            }
          )
        jest.mock('@react-native-community/picker', () => {
            const React = require('React')
            const RealComponent = jest.requireActual('@react-native-community/picker')
          
            class Picker extends React.Component {
              static Item = (props: { children: never }) => {
                return React.createElement('Item', props, props.children)
              }
          
              render () {
                return React.createElement('Picker', this.props, this.props.children)
              }
            }
          
            Picker.propTypes = RealComponent.propTypes
            return {
              Picker
            }
        })
        const assignment = await renderer.create(<Assignment navigation={navigation} route={route} />);
        const tree = assignment.toJSON();
        // assignment.root.findBy
        // tree.find(TouchableOpacity).simulate('press');
        assignment.getInstance().render();
        assignment.getInstance().getQuestions(34);
        assignment.getInstance().answerQuestion();
        assignment.getInstance().checkAnswer()
        await assignment.getInstance().getTopics()
        await assignment.getInstance().getSubtopics()
        assignment.getInstance().nextQuestion();
        expect(assignment).toMatchSnapshot();
    });

    

    it(`Assignment Question Answered`, async () => {
        let route = {
            params: {
                class: 1,
                subject_id: 1,
                question_answered: false,
            }
        }
        const assignment = await renderer.create(<Assignment navigation={navigation} route={route} />);
        assignment.getInstance().render();
        assignment.getInstance().getQuestions(34);
        assignment.getInstance().answerQuestion();
        assignment.getInstance().checkAnswer();
        assignment.getInstance().nextQuestion();
        expect(assignment).toMatchSnapshot();
    });
    it(`Classes renders correctly`, async () => {
        let route = {
            params: {
                class: 1,
                subject_id: 1
            }
        }
        const classes = await renderer.create(<Classes navigation={navigation} route={route} />);

        expect(classes).toMatchSnapshot();
    });
    it(`Home renders correctly`, async () => {

        const home = await renderer.create(<Home navigation={navigation} />);

        expect(home).toMatchSnapshot();
    });

    it(`Homescreen renders correctly`, async () => {

        const home = await renderer.create(<HomeScreen navigation={navigation} />);

        expect(home).toMatchSnapshot();
    });

    it(`Progress Renders Correctly`, async () => {
        const progress = await renderer.create(<Progress navigation={navigation} />);

        expect(progress).toMatchSnapshot();
    });
})
it('tests API calls for syntax issues', async () => {
    DataService.retrieveAccessToken();
    DataService.retrieveQuiz();
    DataService.retrieveTopics();
    DataService.retrieveNotes();
    DataService.retrieveSubjects();
    DataService.answerQuestion();
    DataService.retrieveClasses();
    DataService.retrieveSubtopics();
    DataService.subscribeToPlan();
})
it(`Quiz renders correctly`, async () => {
    var navigation = {
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
    }
    let route = {
        params: {
            class: 1,
            subject_id: 1
        }
    }
    const quiz = await renderer.create(<Quiz route={route} navigation={navigation} />);
    const quizInstance = quiz.getInstance();
    quizInstance.getQuestions();
    quizInstance.nextQuestion();
    quizInstance.checkAnswer();
    quizInstance.answerQuestion();
    expect(quiz).toMatchSnapshot();
});







