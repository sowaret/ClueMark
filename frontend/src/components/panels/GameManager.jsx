import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePanels } from '../../features/appSlice';
import { setCommand, setGameStartSeconds } from '../../features/gameSlice';
import {
	wsSetShowPoison,
	wsSetUseDrOrchid,
	wsStartGame,
} from '../../webSocketModule';
import GameButton from './GameManager/GameButton';
import Options from './GameManager/Options';
import Roster from './GameManager/Roster';
import Suggestions from './GameManager/Suggestions';
import './styles/GameManager';

const GameManager = () => {
	const openPanel = useSelector(state => state.app.openPanelName);
	// Online game
	const command = useSelector(state => state.game.command);
	const isOnlineGameConnected = useSelector(state => state.game.isConnected);
	const isGameActive = useSelector(state => state.game.isGameActive);
	// Online game - client-side information
	const gameHostId = useSelector(state => state.game.hostId);
	const gameStartSeconds = useSelector(state => state.game.gameStartSeconds);
	const playerId = useSelector(state => state.player._id);

	const gameHostKey = useSelector(state => state.game.hostKey);
	const playerJoinKey = useSelector(state => state.player.joinKey);
	const isOnlineAndNotHost = isOnlineGameConnected
		&& (!playerJoinKey || gameHostKey !== playerJoinKey);

	// Refs and dispatch
	const fadedBackgroundRef = useRef();
	const gamestartCountdownTimeoutRef = useRef();
	const dispatch = useDispatch();

	const gameManagerAndIsOpenClasses = [
		'game-manager',
		openPanel === 'game-manager' ? ['open'] : '',
	].join(' ');

	const headerText = isGameActive ? 'Make a suggestion' : 'Options';

	const closePanel = e =>
		e.target === fadedBackgroundRef.current && dispatch(closePanels());

	// Online game
	useEffect(() => {
		if (!command) return;

		const [cmd, value] = command.split('.');
		switch (cmd) {
			case 'setUseDrOrchid':
				dispatch(wsSetUseDrOrchid(value));
			break;

			case 'setShowPoison':
				dispatch(wsSetShowPoison(value));
			break;
		}

		dispatch(setCommand(null));
	}, [command]);

	// Handle game start countdown
	useEffect(() => {
		// Upon cancel
		if (gameStartSeconds === -1) {
			clearTimeout(gamestartCountdownTimeoutRef.current);
			return;
		}
		// Countdown completed
		if (gameStartSeconds === 0) {
			dispatch(setGameStartSeconds(-1));
			if (gameHostId === playerId) dispatch(wsStartGame());
			return;
		}
		// Counting down
		gamestartCountdownTimeoutRef.current = setTimeout(
			_ => dispatch(setGameStartSeconds(gameStartSeconds - 1)),
			1000
		);
	}, [gameStartSeconds]);

	return (
		<div
			className={gameManagerAndIsOpenClasses}
			onClick={closePanel}
			ref={fadedBackgroundRef}
		>
			<div className="game-manager__container">
				<div className="game-manager__header">{headerText}</div>

				<Roster />
				<Options show={!isOnlineAndNotHost} />
				<Suggestions />
				<GameButton
					show={!isOnlineAndNotHost}
					gameStartSeconds={gameStartSeconds}
					isGameActive={isGameActive}
				/>
			</div>
		</div>
	);
};

export default GameManager;
