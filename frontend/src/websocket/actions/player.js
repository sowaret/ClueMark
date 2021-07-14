import {
	joinPlayer,
	playerSelectCharacter,
	removePlayer,
} from '../../features/gameSlice';

export default {
	PLAYER_JOINED: {
		parameters: [],
		reducer: ({ dispatch, payload }) => dispatch(joinPlayer({
			id: payload.id,
			name: payload.name,
		})),
	},

	PLAYER_LEFT: {
		parameters: [],
		reducer: ({ dispatch, payload }) => dispatch(removePlayer({
			id: payload.playerId,
			...payload.prevIndex && { prevIndex: payload.prevIndex },
		})),
	},

	SELECT_CHARACTER: {
		parameters: 'index',
		reducer: ({ dispatch, payload }) => dispatch(playerSelectCharacter({
			playerId: payload.playerId,
			index: payload.index,
			prevIndex: payload.prevIndex,
		})),
	},

	UPDATE_CHAR_INDEX: {
		parameters: [],
		reducer: ({ dispatch, payload }) => {
			const roomCharIndexes = JSON.parse(
				localStorage.getItem('roomCharIndexes')
			);
			localStorage.setItem('roomCharIndexes', JSON.stringify({
				...roomCharIndexes,
				[`${payload.roomCode}.${payload.name}`]: payload.index,
			}));
		},
	},
};
