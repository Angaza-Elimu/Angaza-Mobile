import axios from 'axios';
// import { Helpers } from '../helpers/helpers';
import * as helpers from '../helpers/helpers';

export default {
    login: async(username, password) => {
        let data = {
            username: username,
            password: password
        }
        return fetch("http://staging.angazaelimu.com/api/auth/login", {
            method:"POST",
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((responseData) => {
            console.log(responseData);
            replace('Tab')
        })
        
        
    }
}