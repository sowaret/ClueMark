import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		openPanelName: '',
	},
	reducers: {
		togglePanel: (state, action) => {
			state.openPanelName =
				action.payload !== state.openPanelName ? action.payload : '';
		},
		openPanel: (state, action) => {
			state.openPanelName = action.payload;
		},
		closePanels: state => {
			state.openPanelName = '';
		},
	},
});

export const { togglePanel, openPanel, closePanels } = appSlice.actions;
export default appSlice.reducer;
