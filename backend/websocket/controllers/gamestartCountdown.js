import { Player, Room } from '../../models.js';
import { Deck } from '../classes.js';
import { send } from '../../functions.js';

export default {
	CANCEL_GAME_COUNTDOWN: {
		try: ({ client }) =>
			client.player.room.broadcast({
				type: 'CANCEL_GAME_COUNTDOWN',
			}),
		catch: ({ client, error }) => console.error(error),
	}, // no-op to echo to clients
	START_GAME: {
		try: async ({ client, data }) => {
			const { room } = client.player;
			// Choose a solution and shuffle the deck's remaining cards
			const deck = new Deck(room).chooseSolution();
			const hands = deck.deal();

			// Broadcast cards to each player
			room.broadcast(hands, true);

			for (const name of Object.keys(hands)) {
				Player.updateOne(
					{ name, room: room.document },
					{
						$set: { cardsInHand: hands[name].cards.map(x => x.index) },
					}
				).exec();
			}

			await Room.updateOne(
				{ _id: room.document._id },
				{
					$set: {
						isActive: true,
						activeGamePlayers: room.wsPlayers.map(x => x.document),
					},
				}
			).exec();
		},
		catch: ({ client, error }) => console.error(error),
	},
	START_GAME_COUNTDOWN: {
		try: async ({ client, data }) => {
			const { room } = client.player;
			const roomUserCount = room.wsPlayers.length;
			let err;

			// If no one else has joined yet
			if (roomUserCount === 1) err = 'Please wait for more players to join.';
			// If there are players who haven't picked a character yet
			else if (roomUserCount !== Object.keys(room.playerSlots).length) {
				err = 'Some players have not picked a character yet.';
			}

			if (err) return send(client, { type: 'START_GAME_ERROR', err });

			room.broadcast({ type: 'START_GAME_COUNTDOWN' });
		},
		catch: ({ client, error }) => console.error(error),
	},
};
