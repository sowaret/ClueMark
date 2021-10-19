import { createSlice } from '@reduxjs/toolkit';

const responseDefault = {
	responderName: null,
	// responseState:
	// card ID (0-22)
	// -1 - show waiting modal
	// null - hide response
	responseState: null,
};

export const suggestionSlice = createSlice({
	name: 'suggestion',
	initialState: {
		cards: {
			suspect: null,
			weapon: null,
			room: null,
		},
		suggesterName: '',
		selectedCardId: null,
		...responseDefault,
	},
	reducers: {
		setCards: (state, action) => {
			state.cards = action.payload;
		},

		setSuggesterName: (state, action) => {
			state.suggesterName = action.payload;
		},

		setSelectedCardId: (state, action) => {
			state.selectedCardId = action.payload;
		},

		setSuggestionResponse: (state, action) => {
			if (!action.payload)
				return {
					...state,
					...responseDefault,
				};
			else if (action.payload === 'waiting') {
				state.responseState = -1;
			} else {
				const { cardId, responderName } = action.payload;
				state.responderName = responderName;
				state.responseState = cardId;
			}
		},
	},
});

export const {
	setCards,
	setSelectedCardId,
	setSuggesterName,
	setSuggestionResponse,
} = suggestionSlice.actions;

export default suggestionSlice.reducer;
