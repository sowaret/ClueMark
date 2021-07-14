import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsSelectCharacter } from '../../../webSocketModule';
import {
	selectRoomPlayer,
	setPlayerCharacter,
} from '../../../features/gameSlice';
import PhysPlayer from '../../PhysPlayer';
import RoomPlayer from '../../RoomPlayer';
import './styles/Roster';

const Roster = () => {
	// Any game
	const useDrOrchid = useSelector(state => state.game.useDrOrchid);
	// Local game
	const playerCharacters = useSelector(state => state.game.playerCharacters);
	// Online game
	const isGameActive = useSelector(state => state.game.isGameActive);
	const connectedPlayers = useSelector(state => state.game.players);
	const playerSlots = useSelector(state => state.game.playerSlots);
	// Online game - client-side information
	const gameHostId = useSelector(state => state.game.hostId);
	const playerId = useSelector(state => state.player._id);
	const selectedPlayerId = useSelector(state => state.game.selectedPlayerId);

	const dispatch = useDispatch();

	const selectCharacter = i => {
		// Do nothing if this player is clicking on themselves
		if (playerSlots[i] === playerId) return;
		// If a game is active, select (highlight) this player for interacting, e.g. making a suggestion
		if (isGameActive) return dispatch(selectRoomPlayer(i));
		// Do nothing if another player has already selected this character
		if (playerSlots[i]) return;

		dispatch(wsSelectCharacter(i));
	};

	const localPlayerOptionsDisplay = () => {
		const players = [];
		for (let i = 1; i < 8; i++) {
			const onClick = () => dispatch(setPlayerCharacter({
				index: i,
				toggle: true,
			}));
			players.push(
				<PhysPlayer
					player = {i}
					enabled = {playerCharacters[i]}
					onClick = {onClick}
					key = {`opt-player-${i}`}
				/>
			);
		}

		return players;
	};

	const onlineRosterDisplay = Array.from({ length: 8 }).map((_, i) => {
		if (i === 0) return <div key={i} />;

		const slotPlayerId = playerSlots[i];
		const disabled = (i === 4 && useDrOrchid) || (i === 7 && !useDrOrchid);
		const connectedPlayer = slotPlayerId
			? connectedPlayers[slotPlayerId]
			: {name: ''};

		return <RoomPlayer
			charIndex={i}
			name={connectedPlayer.name}
			disabled={disabled}
			isHost={slotPlayerId === gameHostId}
			you={slotPlayerId === playerId}
			selected={selectedPlayerId === slotPlayerId}
			onClick={() => selectCharacter(i)}
			key={i}
		/>;
	});

	return (
		<>
			<div className="game-manager__section-header">Players</div>

			<div className="playerRoster show-room-game">
				{onlineRosterDisplay}
			</div>

			<div className="hide-room-game">
				<div className={`players marTop10${useDrOrchid ? ' orchid' : ''}`}>
					<div className="game-manager__label">
						Select other players in game:
					</div>
					{localPlayerOptionsDisplay()}
				</div>
			</div>
		</>
	);
};

export default Roster;
