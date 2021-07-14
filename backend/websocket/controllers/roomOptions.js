export default {
	SET_SHOW_POISON: {
		try: async ({ client, data }) => {
			const { show } = data;
			client.player.room._update('poisonEnabled', show)._save();
			client.player.room.broadcast({
				type: 'SET_SHOW_POISON',
				show,
			});
		},
		catch: ({ client, error }) => console.error(error),
	},
	SET_USE_DR_ORCHID: {
		try: async ({ client, data }) => {
			const { room } = client.player;
			const { enabled } = data;
			room._update('orchidEnabled', enabled);
			room.bootWhiteOrchid();
			room._save();
			client.player.room.broadcast({
				type: 'SET_USE_DR_ORCHID',
				enabled,
			});
		},
		catch: ({ client, error }) => console.error(error),
	},
};
