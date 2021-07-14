import { setSuggesterName } from '../../../features/suggestionSlice';
import {
	wsDismissSuggestion,
	wsRespondSuggestionCard,
} from '../../../webSocketModule';

export const handleSuggestionResponse = ({
	dispatch,
	playerHasSuggestionCard,
	selectedCardId,
	suggester,
}) => {
	// Do nothing if the button is disabled
	if (!selectedCardId && playerHasSuggestionCard === 'has_card') return;

	// Hide the modal
	const playerName = suggester;
	dispatch(setSuggesterName(null));

	if (selectedCardId !== null)
		return dispatch(wsRespondSuggestionCard({
			cardId: selectedCardId,
			playerName,
		}));

	dispatch(wsDismissSuggestion(playerName));
};
