import { createSlice } from '@reduxjs/toolkit';
import { cardList } from './utils/cardList';

export const cardsSlice = createSlice({
	name: 'cards',
	initialState: {
		cards: cardList,
		selection: {
			suspect: null,
			weapon: null,
			room: null,
		},
	},
	reducers: {
		setNote: (state, action) => {
			const { cardIndex, noteIndex, value } = action.payload;
			state.cards[cardIndex].notes[noteIndex] = value;
		},
		setNoteColumnValues: (state, action) => {
			const { cardIndexes, noteIndex, value } = action.payload;
			const cards = JSON.parse(JSON.stringify(state.cards));
			state.cards = cards.map((card, i) => {
				card.notes[noteIndex] = cardIndexes.includes(i) ? value : 0;
				return card;
			});
		},
		setSelection: (state, action) => {
			const { cardIndex, type } = action.payload;
			state.selection[type] = cardIndex;
		},
	},
});

export const { setNote, setNoteColumnValues, setSelection } = cardsSlice.actions;
export default cardsSlice.reducer;
