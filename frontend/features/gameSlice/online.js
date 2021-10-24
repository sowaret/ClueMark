export const initialOnlineState = {
	command: null,
	isConnected: false,
	isGameActive: false,
	players: {},
	playerSlots: {},
};

export const onlineReducers = {
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
		const players = { ...state.players };
		const playerSlots = { ...state.playerSlots };

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
	bootWhiteOrchid: state => {
		const playerSlots = { ...state.playerSlots };
		delete playerSlots[4];
		delete playerSlots[7];

		state.playerSlots = playerSlots;
	},
};
