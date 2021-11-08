import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAccusation } from '../features/accusationSlice';
import Modal from './Modal';

const suggestionTypes = ['suspect', 'weapon', 'room'];

const AccusationResponseModal = () => {
	const { cards, playerId, win } = useSelector(state => state.accusation);
	const playerName = useSelector(state => state.game.players[playerId]?.name);
	const cardList = useSelector(state => state.cards.cards);
	const dispatch = useDispatch();

	return (
		<Modal isVisible={!!playerId}>
			{playerName} accused {!win && 'in'}correctly{win ? '!' : ':'}
			{[...cards]
				.sort((a, b) => a - b)
				.map((id, i) => (
					<div className={`suggestion-type ${suggestionTypes[i]}`} key={i}>
						{cardList[id].name}
					</div>
				))}
			<button
				className="bt darkTan"
				onClick={() => dispatch(resetAccusation())}
			>
				Dismiss
			</button>
		</Modal>
	);
};

export default AccusationResponseModal;
