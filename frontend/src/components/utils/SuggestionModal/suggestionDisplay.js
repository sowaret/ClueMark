import React from 'react';
import { setSelectedCardId } from '../../../features/suggestionSlice';
import { cardList } from '../../../features/utils/cardList';
import { handleSuggestionResponse } from './suggestionResponse';

const elementText = {
	has_card: {
		buttonText: 'Show card',
		text: 'Choose a card above to show.',
	},
	no_cards: {
		buttonText: 'Dismiss suggestion',
		text: 'You do not have any of these cards.',
	},
};

const selectCard = ({ cardId, playerHand, dispatch }) =>
	playerHand.includes(cardId) && dispatch(setSelectedCardId(cardId));

export const getSuggestionDisplay = ({
	dispatch,
	playerHand,
	playerHasSuggestionCard,
	selectedCardId,
	suggester,
	suggestionCards,
}) => {
	// Do not display if no suggestion has been received
	if (!suggester) return;

	const suggestionDisplay = Object.keys(suggestionCards).map((type, i) => {
		const cardId = suggestionCards[type];
		const classes = [
			'suggestion-type',
			type,
			...playerHand.includes(cardId) ? '' : ['faded'],
			...selectedCardId === cardId ? ['selected'] : '',
		].join(' ');

		return (
			<div
				className={classes}
				onClick={() => selectCard({ cardId, playerHand, dispatch })}
				key={i}
			>
				{cardList[cardId]?.name}
			</div>
		);
	});

	return {
		contents: (
			<>
				{suggestionDisplay}
				<div className="suggestion__text">
					{elementText[playerHasSuggestionCard].text}
				</div>
			</>
		),
		buttonOnClick: () => handleSuggestionResponse({
			playerHasSuggestionCard,
			selectedCardId,
			suggester,
			dispatch,
		}),
		buttonIsDisabled: !selectedCardId
			&& playerHasSuggestionCard === 'has_card',
		buttonText: elementText[playerHasSuggestionCard].buttonText,
	};
};
