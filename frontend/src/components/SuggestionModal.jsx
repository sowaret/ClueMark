import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSuggestionDisplay,
	getSuggestionResponseDisplay,
} from './utils/SuggestionModal';
import Modal from './Modal';
import './styles/SuggestionModal';

const SuggestionModal = _ => {
	const [playerHasSuggestionCard, setPlayerHasSuggestionCard] =
		useState('no_cards');

	const suggester = useSelector(state => state.suggestion.suggesterName);
	const suggestionCards = useSelector(state => state.suggestion.cards);
	const selectedCardId = useSelector(state => state.suggestion.selectedCardId);
	const responseState = useSelector(state => state.suggestion.responseState);
	const responderName = useSelector(state => state.suggestion.responderName);

	const playerHand = useSelector(state => state.player.handCardIds);
	const dispatch = useDispatch();

	const modalTitle = suggester
		? `${suggester} suggests:`
		: responderName
			? `${responderName} shows you:`
			: null;

	const suggestionDisplay = getSuggestionDisplay({
		suggester,
		suggestionCards,
		playerHand,
		playerHasSuggestionCard,
		selectedCardId,
		dispatch,
	});

	const suggestionResponseDisplay = getSuggestionResponseDisplay({
		responseState,
		dispatch,
	});

	const {
		contents: displayContents,
		buttonIsDisabled,
		buttonOnClick,
		buttonText,
	} = suggestionDisplay || suggestionResponseDisplay || {};

	const displayState = (
		<>
			{displayContents}
			<button
				className="suggestion__confirm-button bt darkTan"
				onClick={buttonOnClick}
				disabled={buttonIsDisabled}
			>
				{buttonText}
			</button>
		</>
	);

	// Check whether the user holds any of the suggestion cards
	useEffect(_ => {
		setPlayerHasSuggestionCard(
			// If the player holds at least one of the suggestion cards
			Object.values(suggestionCards).some(
				cardId => playerHand.includes(cardId)
			)
				? 'has_card'
				: 'no_cards'
		);
	}, [suggestionCards]);

	return (
		<Modal
			name="suggestion"
			title={modalTitle}
			isVisible={!!suggester || responseState !== null}
		>
			{displayState}
		</Modal>
	);
};

export default SuggestionModal;
