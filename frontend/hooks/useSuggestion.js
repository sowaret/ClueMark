import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cardList } from '../features/utils/cardList';
import useClasses from './useClasses';

export default () => {
	const [isSuggestionValid, setIsSuggestionValid] = useState(false);
	const [isAccusationValid, setIsAccusationValid] = useState(false);
	// Online game
	const connectedPlayers = useSelector(state => state.game.players);
	// Online game - client-side information
	const selectedPlayerId = useSelector(state => state.game.selectedPlayerId);
	const selectedCard = {
		suspect: useSelector(state => state.cards.selection.suspect),
		weapon: useSelector(state => state.cards.selection.weapon),
		room: useSelector(state => state.cards.selection.room),
	};

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

	// Validate selections
	useEffect(() => {
		const allCardTypesHaveSelection = Object.values(selectedCard).every(
			x => x !== null
		);
		setIsAccusationValid(allCardTypesHaveSelection);
		setIsSuggestionValid(allCardTypesHaveSelection && selectedPlayerId);
	}, [selectedCard, selectedPlayerId]);

	return {
		isSuggestionValid,
		isAccusationValid,
		selectedPlayerId,
		selectedCard,
		suggestionDisplay: Object.fromEntries(
			['suspect', 'weapon', 'room', 'player'].map(type => [
				type,
				suggestionSelectionDisplay(type),
			])
		),
	};
};
