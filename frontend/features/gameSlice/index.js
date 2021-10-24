import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducers } from './anyAndLocal';
import { initialOnlineState, onlineReducers } from './online';
import { initialOnlineClientState, onlineClientReducers } from './onlineClient';

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		...initialState,
		...initialOnlineState,
		...initialOnlineClientState,
	},
	reducers: {
		...reducers,
		...onlineReducers,
		...onlineClientReducers,
	},
});

export const {
	setGameValue,
	setShowPoison,
	setUseDrOrchid,
	// Local game
	setPlayerCharacter,
	// Online game
	bootWhiteOrchid,
	joinPlayer,
	playerSelectCharacter,
	removePlayer,
	setCommand,
	setIsGameActive,
	// Online game - client-side information
	setGameStartSeconds,
	selectRoomPlayer,
	setPlayerName,
	setRoomId,
	setRoomCode,
} = gameSlice.actions;

export default gameSlice.reducer;
