import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import axios from 'axios';
import './index.css';

axios.defaults.baseURL = "http://127.0.0.1:8000/"
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function(config){
	const token = localStorage.getItem('app_token');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);