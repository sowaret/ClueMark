const parseBool = value => value === 'true' || value === true;

export const initialState = {
	showPoison: false,
	useDrOrchid: false,
	// Local game
	playerCharacters: [false, true, false, false, false, false, false, false],
};

export const reducers = {
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
};
