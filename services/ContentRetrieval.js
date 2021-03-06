import axios from 'axios';
import React from 'react';
import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';

// Config.NET_STATUS
export function retrieveAccessToken() {
    AsyncStorage.getItem('access_token').then(response => {
        console.log(response);
        return response;
    })
}

export function getUserDetails() {

}

export function retrieveLearningSystem() {

}

export function retrieveClasses(learning_system) {
    let access_token = retrieveAccessToken();

    axios.post('https://staging.angazaelimu.com/api/getStudentClasses', {}, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }).then(response => {
        console.log(response);
        return response;
    }, err => {
        console.log("Error retrieving data")
    });

}
export async function retrieveQuiz(subtopic_id){

    const access_token = await AsyncStorage.getItem('access_token');
    const json = await axios.post('https://staging.angazaelimu.com/api/getQuiz', {
        subtopic_id: subtopic_id,
        type: 'quizq_questions'
    }, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    });
    return json.data;
    AsyncStorage.getItem('access_token').then(response => {
        axios.post('https://staging.angazaelimu.com/api/getQuizQuestions', {
            subtopic_id: subtopic_id
        },{
            headers: {
                "Authorization": "Bearer " + response
            }
        }).then(response => {
            return response["data"];
        });
    })
}

export async function answerQuestion(subject_id,subtopic_id, marked,answer,question_id,student_id,quiz_id ){
    let data = {
        subject_id: subject_id,
        subtopic_id: subtopic_id,
        marked:marked,
        answer: answer,
        question_id: question_id,
        student_id:student_id,
        quiz_id: quiz_id
    }
    AsyncStorage.getItem('access_token').then(response => {
        axios.get('https://staging.angazaelimu.com/api/answerQuestion', {
            headers: {
                "Authorization": "Bearer " + response
            }
        }).then(response => {
            console.log(response["data"]);
            return response["data"];
        });
    })
}

export async function retrieveNotes(subtopic_id) {
    const access_token = await AsyncStorage.getItem('access_token');
    const json = await axios.post('https://staging.angazaelimu.com/api/getSubtopicNotes', {
        subtopic_id: subtopic_id
    }, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    });
    return json.data;
}

export async function retrieveSubjects(learningSystem) {
    AsyncStorage.getItem('access_token').then(response => {
        axios.get('https://staging.angazaelimu.com/api/getSubjects', {
            headers: {
                "Authorization": "Bearer " + response
            }
        }).then(response => {
            console.log(response["data"]);
            return response["data"];
        });
    })

}

export async function retrieveTopics(class_id, subject_id) {
   
    const access_token = await AsyncStorage.getItem('access_token');
    const json = await axios.post('https://staging.angazaelimu.com/api/getTopics', {
        subject_id: subject_id,
        class: class_id
    }, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    });
    return json.data;

}

export async function retrieveSubtopics(topic_id) {
    const access_token = await AsyncStorage.getItem('access_token');
    const json = await axios.post('https://staging.angazaelimu.com/api/getSubtopics', {
        topic_id: topic_id
    }, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    });
    console.log(json.data);
    return json.data;

}
