import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsCancelGameCountdown } from '../webSocketModule';
import Modal from './Modal';
import './styles/GameCountdownModal';

const GameCountdownModal = () => {
	const gameStartSeconds = useSelector(state => state.game.gameStartSeconds);
	const dispatch = useDispatch();

	return (
		<Modal
			name="gameCountdown"
			title="Starting game in:"
			isVisible={gameStartSeconds > 0}
		>
			<div className="gameCountdown__value">{gameStartSeconds}</div>
			<button
				className="gameCountdown__cancel-button bt darkTan hide-non-host"
				onClick={() => dispatch(wsCancelGameCountdown())}
			>
				Cancel
			</button>
		</Modal>
	);
};

export default GameCountdownModal;
