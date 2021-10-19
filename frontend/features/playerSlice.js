import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
	name: 'player',
	initialState: {
		// Online game
		_id: null,
		name: null,
		joinKey: null,
		handCardIds: [],
	},
	reducers: {
		setId: (state, action) => {
			state._id = action.payload;
		},

		setName: (state, action) => {
			state.name = action.payload;
		},

		setJoinKey: (state, action) => {
			state.joinKey = action.payload;
		},

		setHandCardIds: (state, action) => {
			state.handCardIds = action.payload;
		},
	},
});

export const { setHandCardIds, setId, setJoinKey, setName } =
	playerSlice.actions;

export default playerSlice.reducer;
