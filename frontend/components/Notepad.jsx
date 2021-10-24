import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanel } from '../features/appSlice';
import useClasses from '../hooks/useClasses';
import { wsConnect } from '../webSocketModule';
import RoomManager from './panels/RoomManager';
import GameManager from './panels/GameManager';
import NotepadSections from './utils/Notepad';
import ConnectionManager from './ConnectionManager';
import SuggestionModal from './SuggestionModal';
import GameCountdownModal from './GameCountdownModal';
import './styles/Notepad';

const Notepad = () => {
	const gameHostKey = useSelector(state => state.game.hostKey);
	const isGameActive = useSelector(state => state.game.isGameActive);
	const isOnlineGameConnected = useSelector(state => state.game.isConnected);
	const showPoison = useSelector(state => state.game.showPoison);
	const useDrOrchid = useSelector(state => state.game.useDrOrchid);

	const panelName = useSelector(state => state.app.openPanelName);
	const playerJoinKey = useSelector(state => state.player.joinKey);

	const classes = useClasses(
		'notepad',
		panelName && `${panelName}-open`,
		isOnlineGameConnected && 'room-game',
		isGameActive && 'game-active',
		useDrOrchid && 'useDrOrchid',
		!showPoison && 'hidePoison',
		// If a room is joined and the player is not the host
		isOnlineGameConnected &&
			(!playerJoinKey || gameHostKey !== playerJoinKey) &&
			'not-host'
	);
	const roomToggleClasses = useClasses(
		'panel-toggle',
		'roomToggle',
		isOnlineGameConnected && 'joined'
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnect('ws://localhost:8080'));
	}, []);

	return (
		<div className={classes}>
			<ConnectionManager />
			<SuggestionModal />
			<GameCountdownModal />

			<button
				className={roomToggleClasses}
				onClick={() => dispatch(togglePanel('room'))}
			/>
			<button
				className="game-manager-toggle"
				onClick={() => dispatch(togglePanel('game-manager'))}
			/>
			<div className="host-indicator" title="You are the room host" />

			<RoomManager />
			<GameManager />

			{NotepadSections}
		</div>
	);
};

export default Notepad;
