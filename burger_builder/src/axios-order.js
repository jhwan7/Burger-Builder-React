import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f8951.firebaseio.com/'
});

export default instance;