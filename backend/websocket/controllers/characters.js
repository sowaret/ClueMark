import { send } from '../../functions.js';

export default {
	SELECT_CHARACTER: {
		hostOnly: false,
		try: async ({ client, data }) => {
			const { player } = client;
			const { room } = player;
			const { index } = data;
			const prevCharIndex = room.setCharacterPlayer(player, index);

			// Send client success so their localStorage updates
			send(client, {
				type: 'UPDATE_CHAR_INDEX',
				name: player.name,
				roomCode: room.code,
				index,
			});

			room.broadcast({
				type: 'SELECT_CHARACTER',
				playerId: player.id,
				index,
				...prevCharIndex && { prevIndex: prevCharIndex },
			})
		},
		catch: ({ client, error }) => console.error(error),
	},
};
