import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardList } from '../../../features/utils/cardList';
import { setSuggestionResponse } from '../../../features/suggestionSlice';
import useClasses from '../../../hooks/useClasses';
import { wsSendSuggestion } from '../../../webSocketModule';
import './styles/Suggestions';

const Suggestions = () => {
	const [isSuggestionValid, setIsSuggestionValid] = useState(false);
	// Online game
	const isGameActive = useSelector(state => state.game.isGameActive);
	const connectedPlayers = useSelector(state => state.game.players);
	// Online game - client-side information
	const selectedPlayerId = useSelector(state => state.game.selectedPlayerId);
	const selectedCard = {
		suspect: useSelector(state => state.cards.selection.suspect),
		weapon: useSelector(state => state.cards.selection.weapon),
		room: useSelector(state => state.cards.selection.room),
	};
	const dispatch = useDispatch();

	const suggestionSelectionDisplay = type => {
		// Player ID or card data
		const selection = type === 'player' ? selectedPlayerId : selectedCard[type];

		const classes = useClasses(
			'suggestion-type',
			type,
			// Fade empty selections
			selection === null && 'faded'
		);

		const text =
			type === 'player'
				? // Player selection
				  selection
					? `Asking ${connectedPlayers[selection].name}`
					: 'Select a player to ask from the roster'
				: // Card selection
				selection !== null
				? cardList[selection].name
				: `Select a ${type} to suggest from the notepad`;

		return <div className={classes}>{text}</div>;
	};

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

	// Validate suggestion
	useEffect(() => {
		setIsSuggestionValid(
			// If a player is selected from the roster
			selectedPlayerId &&
				// If all card types have a selection
				Object.values(selectedCard).every(x => x !== null)
		);
	}, [selectedCard, selectedPlayerId]);

	return isGameActive ? (
		<>
			{suggestionSelectionDisplay('suspect')}
			{suggestionSelectionDisplay('weapon')}
			{suggestionSelectionDisplay('room')}
			{suggestionSelectionDisplay('player')}

			<div className="center">
				<button
					className="bt darkTan send-suggestion"
					onClick={sendSuggestion}
					disabled={!isSuggestionValid}
				>
					Make suggestion
				</button>
			</div>
		</>
	) : null;
};

export default Suggestions;
