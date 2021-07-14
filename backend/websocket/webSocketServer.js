import middlewarePkg from '@sowaret/redux-websocket-middleware';
const { createWebSocketServer } = middlewarePkg;
import { WSRoomList } from './classes.js';
import controllers from './controllers.js';

export default port => createWebSocketServer({
	cancelDispatch: ({ client, type }) => {
		// Don't dispatch host-only actions if player is not the host
		if (controllers[type].hostOnly !== false && !client.player.isHost) {
			console.error('non-host cannot use', type);
			return true;
		}
	},
	controllers,
	onClose: client => {
		if (!client.player) return;

		const prevIndex = client.player.room.removeWSPlayer(client.player);
		client.player.room.broadcast({
			type: 'PLAYER_LEFT',
			playerId: client.player.id,
			...prevIndex !== null && { prevIndex },
		});
	},
	port,
	wsClass: WSRoomList,
	wsClassParamName: 'RoomList',
});
