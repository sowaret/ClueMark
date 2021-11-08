import React from 'react';
import { useDispatch } from 'react-redux';
import useSuggestion from '../hooks/useSuggestion';
import { wsMakeAccusation } from '../webSocketModule';
import Modal from './Modal';
import './styles/AccusationModal';

const AccusationModal = ({ isVisible, close }) => {
	const { selectedCard, suggestionDisplay } = useSuggestion();
	const dispatch = useDispatch();

	return (
		<Modal name="accusation" title="Make an accusation" isVisible={isVisible}>
			<div className="accusation__warn">Are you sure?</div>
			{suggestionDisplay.suspect}
			{suggestionDisplay.weapon}
			{suggestionDisplay.room}
			<div className="accusation__warn">
				If this is not the solution to the game, you lose.
			</div>
			<button
				className="bt darkTan accusation__confirm suggestion-modal make-accusation"
				onClick={() => {
					dispatch(wsMakeAccusation({ cards: Object.values(selectedCard) }));
					close();
				}}
			>
				Make accusation
			</button>
			<div>
				or
				<button className="bt accusation__cancel" onClick={close}>
					cancel
				</button>
			</div>
		</Modal>
	);
};

export default AccusationModal;
