import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestionResponse } from '../../../features/suggestionSlice';
import useSuggestion from '../../../hooks/useSuggestion';
import { wsSendSuggestion } from '../../../webSocketModule';
import AccusationModal from '../../AccusationModal';
import './styles/Suggestions';

const Suggestions = () => {
	const [makeAccusation, setMakeAccusation] = useState(false);
	const isGameActive = useSelector(state => state.game.isGameActive);
	const {
		isSuggestionValid,
		isAccusationValid,
		selectedPlayerId,
		selectedCard,
		suggestionDisplay,
	} = useSuggestion();
	const dispatch = useDispatch();

	const sendSuggestion = () => {
		if (!isSuggestionValid) return;
		dispatch(
			wsSendSuggestion({
				playerId: selectedPlayerId,
				cards: selectedCard,
			})
		);
		dispatch(setSuggestionResponse('waiting'));
	};

	return isGameActive ? (
		<>
			{suggestionDisplay.suspect}
			{suggestionDisplay.weapon}
			{suggestionDisplay.room}
			{suggestionDisplay.player}

			<div className="center">
				<button
					className="bt darkTan suggestion-modal send-suggestion"
					onClick={sendSuggestion}
					disabled={!isSuggestionValid}
				>
					Make suggestion
				</button>
				<button
					className="bt darkTan suggestion-modal make-accusation"
					onClick={() => setMakeAccusation(true)}
					disabled={!isAccusationValid}
				>
					Make accusation
				</button>
			</div>

			<AccusationModal
				isVisible={makeAccusation}
				close={() => setMakeAccusation(false)}
			/>
		</>
	) : null;
};

export default Suggestions;
