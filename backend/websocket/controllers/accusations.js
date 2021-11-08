import { Room } from '../../models.js';

const getCardIdList = cards => cards.sort().join(',');

export default {
	MAKE_ACCUSATION: {
		hostOnly: false,
		try: async ({ client, data }) => {
			const { id, room } = client.player;
			const { cards } = data;
			const win =
				getCardIdList(cards) ===
				getCardIdList(
					Object.entries(room.solution).map(([type, card]) => card.index)
				);

			if (win)
				await Room.updateOne(
					{ _id: room.document._id },
					{
						$set: {
							isActive: false,
							activeGamePlayers: [],
						},
					}
				).exec();

			room.broadcast({
				type: 'RESOLVE_ACCUSATION',
				win,
				playerId: id,
				cards,
			});
		},
		catch: ({ client, error }) => console.error(error),
	},
};
