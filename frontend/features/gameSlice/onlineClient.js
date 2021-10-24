// Online game - client-side information
export const initialOnlineClientState = {
	playerId: null,
	playerName: null,
	roomId: null,
	roomCode: '',
	hostKey: null,
	hostId: null,
	gameStartSeconds: -1,
	selectedPlayerId: null,
};

export const onlineClientReducers = {
	setPlayerName: (state, action) => {
		state.playerName = action.payload;
	},
	setRoomId: (state, action) => {
		state.roomId = action.payload;
	},
	setRoomCode: (state, action) => {
		state.roomCode = action.payload;
	},
	setGameStartSeconds: (state, action) => {
		state.gameStartSeconds = action.payload;
	},
	selectRoomPlayer: (state, action) => {
		state.selectedPlayerId = state.playerSlots[action.payload];
	},
};
