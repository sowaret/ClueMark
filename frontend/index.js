require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './css/index.css';
import Notepad from './components/Notepad';

ReactDOM.render(
	<Provider store={store}>
		<Notepad />
	</Provider>,
	document.getElementById('root')
);
