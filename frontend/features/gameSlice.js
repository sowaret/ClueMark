import { createSlice } from '@reduxjs/toolkit';

const parseBool = value => value === 'true' || value === true;

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		showPoison: false,
		useDrOrchid: false,
		// Local game
		playerCharacters: [false, true, false, false, false, false, false, false],
		// Online game
		command: null,
		isConnected: false,
		isGameActive: false,
		players: {},
		playerSlots: {},
		// Online game - client-side information
		playerId: null,
		playerName: null,
		roomId: null,
		roomCode: '',
		hostKey: null,
		hostId: null,
		gameStartSeconds: -1,
		selectedPlayerId: null,
	},
	reducers: {
		setGameValue: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},

		setShowPoison: (state, action) => {
			state.showPoison = parseBool(action.payload);
		},

		setUseDrOrchid: (state, action) => {
			state.useDrOrchid = parseBool(action.payload);
			if (!state.isConnected) {
				// Deselect White and Orchid
				const playerCharacters = [...state.playerCharacters];
				playerCharacters[4] = false;
				playerCharacters[7] = false;
				state.playerCharacters = playerCharacters;
			}
		},

		// Local game
		setPlayerCharacter: (state, action) => {
			const playerCharacters = [...state.playerCharacters];
			const { index, toggle, enabled } = action.payload;

			playerCharacters[index] = toggle ? !playerCharacters[index] : enabled;

			state.playerCharacters = playerCharacters;
		},

		// Online game
		setCommand: (state, action) => {
			state.command = action.payload;
		},

		setIsGameActive: (state, action) => {
			state.isGameActive = action.payload;
		},

		joinPlayer: (state, action) => {
			state.players[action.payload.id] = { name: action.payload.name };
		},

		removePlayer: (state, action) => {
			const players = { ...state.players },
				playerSlots = { ...state.playerSlots };

			delete players[action.payload.playerId];
			state.players = players;

			if (action.payload.prevIndex) {
				delete playerSlots[action.payload.prevIndex];
				state.playerSlots = playerSlots;
			}
		},
		playerSelectCharacter: (state, action) => {
			const playerSlots = { ...state.playerSlots };

			delete playerSlots[action.payload.prevIndex];

			state.playerSlots = {
				...playerSlots,
				[action.payload.index]: action.payload.playerId,
			};
		},
		bootWhiteOrchid: (state, action) => {
			const playerSlots = { ...state.playerSlots };
			delete playerSlots[4];
			delete playerSlots[7];

			state.playerSlots = playerSlots;
		},

		// Online game - client-side information
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
