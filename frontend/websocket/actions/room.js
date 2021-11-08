import { setNoteColumnValues } from '../../features/cardsSlice';
import {
	setIsGameActive,
	setGameStartSeconds,
	setGameValue,
	setShowPoison,
	setUseDrOrchid,
} from '../../features/gameSlice';
import { setHandCardIds } from '../../features/playerSlice';

export default {
	CREATE_ROOM: { parameters: ['hostId', 'hostKey', 'roomCode'] },
	JOIN_ROOM: { parameters: ['joinKey', 'playerId', 'playerName'] },
	POPULATE_STATE: {
		parameters: [],
		reducer: ({ dispatch, payload }) => {
			dispatch(setIsGameActive(payload.isGameActive));
			dispatch(setGameValue({ key: 'hostId', value: payload.hostId }));
			dispatch(setGameValue({ key: 'players', value: payload.players }));
			dispatch(
				setGameValue({ key: 'playerSlots', value: payload.playerSlots })
			);
			dispatch(setUseDrOrchid(payload.useDrOrchid));
			dispatch(setShowPoison(payload.showPoison));

			const cardIndexes = payload.cardIndexes;
			if (cardIndexes) {
				// Mark Xs on a column of the user's notepad for the cards in their hand
				dispatch(
					setNoteColumnValues({
						cardIndexes,
						value: -1,
						noteIndex: 0,
					})
				);
				dispatch(setHandCardIds(cardIndexes));
			}

			// Attempt to re-select previously-selected character if player is re-joining
			const roomCharIndexes = JSON.parse(
				localStorage.getItem('roomCharIndexes')
			);
			const prevIndex = roomCharIndexes[`${payload.roomCode}.${payload.name}`];
			if (prevIndex == null) return; // null or undefined

			// Unset localStorage charIndex if another player has since selected this character
			if (payload.playerSlots[prevIndex]) {
				localStorage.setItem(
					'roomCharIndexes',
					JSON.stringify({
						...roomCharIndexes,
						[`${payload.roomCode}.${payload.name}`]: null,
					})
				);
				return;
			}

			return { rejoinCharacterIndex: prevIndex };
		},
	},
};
