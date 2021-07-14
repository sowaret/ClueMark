import { send } from '../../functions.js';

const suggestionController = (generatePayload, usePlayerName = false) => {
	const dataKey = usePlayerName ? 'playerName' : 'playerId';
	const ifNameParam = [...usePlayerName ? ['name'] : ''];

	return {
		hostOnly: false,
		try: async ({ client, data }) => send(
			client.player.room.getPlayerWebSocket(data[dataKey], ...ifNameParam),
			generatePayload({ client, data })
		),
		catch: ({ error }) => console.error(error),
	};
};

export default {
	SEND_SUGGESTION: suggestionController(({ client, data }) => ({
		type: 'RECEIVE_SUGGESTION',
		cards: data.cards,
		suggesterName: client.player.name,
	})),
	RESPOND_SUGGESTION_CARD: suggestionController(({ client, data }) => ({
		type: 'RECEIVE_SUGGESTION_CARD',
		cardId: data.cardId,
		responderName: client.player.name,
	}), true),
	DISMISS_SUGGESTION: suggestionController(() => ({
		type: 'DISMISS_SUGGESTION',
	}), true),
};
