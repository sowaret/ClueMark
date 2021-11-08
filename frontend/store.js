import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import accusation from './features/accusationSlice';
import app from './features/appSlice';
import cards from './features/cardsSlice';
import game from './features/gameSlice';
import player from './features/playerSlice';
import roomPanel from './features/roomPanelSlice';
import suggestion from './features/suggestionSlice';
import wsMiddleware from './websocket/middleware';

const reducers = combineReducers({
	accusation,
	app,
	cards,
	game,
	player,
	roomPanel,
	suggestion,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
	reducers,
	composeEnhancers(applyMiddleware(wsMiddleware))
);
