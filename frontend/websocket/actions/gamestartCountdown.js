import { setNoteColumnValues } from '../../features/cardsSlice';
import { setIsGameActive, setGameStartSeconds } from '../../features/gameSlice';
import { setHandCardIds } from '../../features/playerSlice';

const definitions = {
	START_GAME_COUNTDOWN: {
		reducer: ({ dispatch }) => dispatch(setGameStartSeconds(3)),
	},
	CANCEL_GAME_COUNTDOWN: {
		reducer: ({ dispatch }) => dispatch(setGameStartSeconds(-1)),
	},
	START_GAME: {
		reducer: ({ dispatch, payload }) => {
			const cardIndexes = payload.cards.map(x => x.index);

			dispatch(setIsGameActive(true));
			dispatch(setHandCardIds(cardIndexes));
			// Mark Xs on a column of the user's notepad for the cards they were dealt
			dispatch(
				setNoteColumnValues({
					cardIndexes,
					value: -1,
					noteIndex: 0,
				})
			);
		},
	},
};

const otherReducers = {
	START_GAME_ERROR: ({ payload }) =>
		alert('Could not start game:\n' + payload.err),
};

export default { definitions, otherReducers };
