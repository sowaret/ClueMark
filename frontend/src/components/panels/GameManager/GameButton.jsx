import React from 'react';
import { useDispatch } from 'react-redux';
import { wsStartGameCountdown } from '../../../webSocketModule';

const GameButton = ({ isGameActive, gameStartSeconds, show }) => {
	const dispatch = useDispatch();

	const gameButtonText = isGameActive
		? 'End game'
		: gameStartSeconds < 0
			? 'Start game'
			: 'Starting game...';

	const handleClick = () => isGameActive
		? null
		: gameStartSeconds === -1
			? dispatch(wsStartGameCountdown())
			: null;

	return show && (
		<div className="center">
			<button
				className="bt darkTan show-room-game"
				onClick={handleClick}
			>
				{gameButtonText}
			</button>
		</div>
	);
};

export default GameButton;
