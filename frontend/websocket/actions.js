import gameOptionsActions from './actions/gameOptions';
import gamestartCountdownActions from './actions/gamestartCountdown';
import playerActions from './actions/player';
import roomActions from './actions/room';
import suggestionsActions from './actions/suggestions';

const definitions = {
	...gameOptionsActions,
	...gamestartCountdownActions,
	...playerActions,
	...roomActions,
	...suggestionsActions,
};

module.exports = definitions;
