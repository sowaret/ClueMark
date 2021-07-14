import { Player } from '../../models.js';
import { WSPlayer } from '../classes.js';
import { send } from '../../functions.js';

const getPlayer = ({ client, data, RoomList }) =>
	Player.findById(data.hostId || data.playerId)
	.populate('room')
	.then(player => {
		const wsRoom = RoomList.getOrCreateWSRoom(player.room);

		client.player = new WSPlayer(client, wsRoom, player);
		client.player.charIndex = player.charIndex;
		client.player.isHost =
			(data.hostKey || data.joinKey) === wsRoom.hostJoinKey;

		const { hostId, players, playerSlots } = wsRoom;

		send(client, {
			type: 'POPULATE_STATE',
			hostId,
			players,
			playerSlots,
			useDrOrchid: wsRoom.orchidEnabled,
			showPoison: wsRoom.poisonEnabled,

			// Send their name and the room code as well so the websocket middleware can re-select their previously-selected character
			name: player.name,
			roomCode: player.room.code,
			// Send their cards if the game has been started
			...wsRoom.document.isActive && {cardIndexes: player.cardsInHand},
		});

		return player;
	})
	.catch(err => console.error(err));

export default {
	CREATE_ROOM: {
		hostOnly: false,
		try: ({ client, data, RoomList }) =>
			getPlayer({ client, data, RoomList }),
		catch: ({ client, error }) => console.error(error),
	},
	JOIN_ROOM: {
		hostOnly: false,
		try: async ({ client, data, RoomList }) => {
			const player = await getPlayer({ client, data, RoomList });
			client.player.room.broadcast({
				type: 'PLAYER_JOINED',
				id: player.id,
				name: player.name,
			});
		},
		catch: ({ client, error }) => console.error(error),
	},
};
