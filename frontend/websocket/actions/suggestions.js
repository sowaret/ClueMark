import { selectRoomPlayer } from '../../features/gameSlice';
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
	RESPOND_SUGGESTION_CARD: {
		parameters: ['cardId', 'playerName'],
		reducer: ({ dispatch, payload }) =>
			dispatch(setSuggestionResponse(payload)),
		reducerName: 'RECEIVE_SUGGESTION_CARD',
	},
	DISMISS_SUGGESTION: {
		parameters: 'playerName',
		reducer: ({ dispatch, payload }) => {
			dispatch(setSuggestionResponse('no-cards'));
			dispatch(selectRoomPlayer());
		},
	},
};
