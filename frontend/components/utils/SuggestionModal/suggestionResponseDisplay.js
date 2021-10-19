import React from 'react';
import { cardList } from '../../../features/utils/cardList';
import { setSuggestionResponse } from '../../../features/suggestionSlice';

export const getSuggestionResponseDisplay = ({ dispatch, responseState }) => {
	if (responseState === null) return;

	const message =
		responseState === -1
			? 'Waiting for a response...'
			: cardList[responseState].name;

	return {
		contents: <div className="suggestion-response">{message}</div>,
		buttonOnClick: () => dispatch(setSuggestionResponse()), // Reset response
		buttonText: 'Dismiss',
	};
};
