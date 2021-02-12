import React from 'react'

import  * as app from '../app.json'
import { AsyncStorage, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');


export function url(path){
    let config = {
        prod: true
    }
    if(config.prod == true){
        let query_url = "https://staging.angazaelimu.com" + path;
        return query_url;
    } else {
        let query_url = "http://localhost:8000" + path;
        return query_url;
    }
}