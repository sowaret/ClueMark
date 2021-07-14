import characters from './controllers/characters.js';
import gamestartCountdown from './controllers/gamestartCountdown.js';
import room from './controllers/room.js';
import roomOptions from './controllers/roomOptions.js';
import suggestions from './controllers/suggestions.js';

export default {
	...characters,
	...gamestartCountdown,
	...room,
	...roomOptions,
	...suggestions,
};
