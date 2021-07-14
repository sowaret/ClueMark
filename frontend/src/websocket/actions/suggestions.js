import {
	setCards,
	setSelectedCardId,
	setSuggesterName,
	setSuggestionResponse,
} from '../../features/suggestionSlice';

export default {
	SEND_SUGGESTION: {
		parameters: ['cards', 'playerId'],
		reducer: ({ dispatch, payload }) => {
			dispatch(setCards(payload.cards));
			dispatch(setSelectedCardId(null));
			dispatch(setSuggesterName(payload.suggesterName));
		},
		reducerName: 'RECEIVE_SUGGESTION',
	},

	// Update message modal, mark telling player's colour on first column automatically
	RESPOND_SUGGESTION_CARD: {
		parameters: ['cardId', 'playerName'],
		reducer: ({ dispatch, payload }) =>
			dispatch(setSuggestionResponse(payload)),
		reducerName: 'RECEIVE_SUGGESTION_CARD',
	},

	// Deselect player and close 'waiting' modal
	DISMISS_SUGGESTION: {
		reducer: ({ dispatch, payload }) => {},
		parameters: 'playerName',
	},
};
