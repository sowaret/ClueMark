import accusationsActions from './actions/accusations';
import gameOptionsActions from './actions/gameOptions';
import gamestartCountdown from './actions/gamestartCountdown';
import playerActions from './actions/player';
import roomActions from './actions/room';
import suggestionsActions from './actions/suggestions';

const definitions = {
	...accusationsActions,
	...gameOptionsActions,
	...gamestartCountdown.definitions,
	...playerActions,
	...roomActions,
	...suggestionsActions,
};

const otherReducers = gamestartCountdown.otherReducers;

module.exports = { definitions, otherReducers };
