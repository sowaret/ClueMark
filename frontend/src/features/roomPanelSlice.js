import { createSlice } from '@reduxjs/toolkit';

export const roomPanelSlice = createSlice({
	name: 'roomPanel',
	initialState: {
		nameInput: '',
		nameError: null,
		roomCodeInput: '',
		roomCodeError: null,
		isInputValid: false,
		isPosting: false,
	},
	reducers: {
		setNameInput: (state, action) => {
			state.nameInput = action.payload;
		},

		setNameError: (state, action) => {
			state.nameError = action.payload;
		},

		setRoomCodeInput: (state, action) => {
			state.roomCodeInput = action.payload;
		},

		setRoomCodeError: (state, action) => {
			state.roomCodeError = action.payload;
		},

		resetInputErrors: state => {
			state.nameError = null;
			state.roomCodeError = null;
		},

		setIsInputValid: (state, action) => {
			state.isInputValid = action.payload;
		},

		setIsPosting: (state, action) => {
			state.isPosting = action.payload;
		},
	},
});

export const {
	resetInputErrors,
	setIsInputValid,
	setIsPosting,
	setNameError,
	setNameInput,
	setRoomCodeError,
	setRoomCodeInput,
} = roomPanelSlice.actions;

export default roomPanelSlice.reducer;
