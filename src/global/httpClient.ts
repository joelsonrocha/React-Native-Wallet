import axios from 'axios';
import {Platform} from 'react-native';

const HttpClient = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3004'
      : 'http://localhost:3004',
});

export default HttpClient;
