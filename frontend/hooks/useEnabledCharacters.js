import { useSelector } from 'react-redux';

const mapOnlinePlayersToEnabledCharacterState = playerSlots =>
	Array.from({ length: 8 }).map((_, i) => !!playerSlots[i]);

export default useEnabledCharacters = () => {
	// Get the list of enabled characters
	const isOnlineGame = useSelector(state => state.game.isConnected);
	const playerCharacters = useSelector(state => state.game.playerCharacters);
	const playerSlots = useSelector(state => state.game.playerSlots);
	const enabledCharacters = isOnlineGame
		? mapOnlinePlayersToEnabledCharacterState(playerSlots)
		: playerCharacters;

	return enabledCharacters;
};
