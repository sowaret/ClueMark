import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import app from './features/appSlice';
import cards from './features/cardsSlice';
import game from './features/gameSlice';
import player from './features/playerSlice';
import roomPanel from './features/roomPanelSlice';
import suggestion from './features/suggestionSlice';
import wsMiddleware from './websocket/middleware';

const reducers = combineReducers({
	app,
	cards,
	game,
	player,
	roomPanel,
	suggestion,
});

export default createStore(
	reducers,
	compose(
		applyMiddleware(wsMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
	),
);
