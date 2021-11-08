import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cards: [],
	playerId: null,
	win: false,
};

const accusationSlice = createSlice({
	name: 'accusation',
	initialState,
	reducers: {
		resetAccusation: () => initialState,
		setAccusation: (state, action) => action.payload,
	},
});

export const { resetAccusation, setAccusation } = accusationSlice.actions;
export default accusationSlice.reducer;
