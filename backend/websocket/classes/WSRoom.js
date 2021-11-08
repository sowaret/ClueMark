import { send } from '../../functions.js';

const dbKeysToClone = [
	'code',
	'hostId',
	'hostJoinKey',
	'isActive',
	'poisonEnabled',
	'orchidEnabled',
];

export default class WSRoom {
	constructor(roomDocument) {
		this.document = roomDocument;

		// Clone the document into this class
		dbKeysToClone.map(key => {
			this[key] = roomDocument[key];
		});

		this.id = roomDocument._id;
		this.players = {};
		this.playerSlots = {};
		this.wsPlayers = [];
	}

	joinPlayer(wsPlayer) {
		this.wsPlayers.push(wsPlayer);
		this.players[wsPlayer.id] = {
			name: wsPlayer.name,
			charIndex: null,
		};
	}

	getPlayerWebSocket(identifier, type = 'id') {
		return this.wsPlayers.find(x => x[type] === identifier)?.client;
	}

	removeWSPlayer(wsPlayer) {
		this.wsPlayers = this.wsPlayers.filter(x => x !== wsPlayer);

		const charIndex = wsPlayer.document.charIndex;
		if (charIndex !== null) {
			const playerSlots = { ...this.playerSlots };
			delete playerSlots[charIndex];
			this.playerSlots = playerSlots;

			wsPlayer.update('charIndex', null).save();
		}

		return charIndex;
	}

	/*
	Broadcast data to the room
	`data` may look like:
	{
		type: 'JOIN_ROOM',
		name: 'Jim'
	}
	
	If `each` = true:
	{
		'Jim': {
			type: 'START_GAME',
			cards: [...]
		},
		'Pam': {
			type: 'START_GAME',
			cards: [...]
		}
	}
	*/
	broadcast(data, each = false) {
		this.wsPlayers.forEach(player => {
			const _data = each ? data[player.name] : data;

			// This will do nothing for players who had no data for `each`
			if (_data) send(player.client, _data);
		});
	}

	setCharacterPlayer(player, index) {
		const playerSlots = { ...this.playerSlots };
		/*  Do nothing if a player has already selected this character
			or if their White/Orchid selection is not available */
		if (
			playerSlots[index] ||
			(index === 4 && this.orchidEnabled) ||
			(index === 7 && !this.orchidEnabled)
		)
			return;

		const prevIndex =
			player.document.charIndex !== null ? player.document.charIndex : null;

		// Remove player from any previous character
		if (prevIndex) delete playerSlots[prevIndex];

		player.update('charIndex', index).save();

		playerSlots[index] = player.id;
		this.playerSlots = playerSlots;

		return prevIndex;
	}

	bootWhiteOrchid(isOrchidEnabled) {
		isOrchidEnabled = isOrchidEnabled === 'true' || isOrchidEnabled === true;
		const playerSlots = { ...this.playerSlots };
		delete playerSlots[4];
		delete playerSlots[7];
		this.playerSlots = playerSlots;
		this.wsPlayers
			.filter(p => p.charIndex === 3 || p.charIndex === 6) // White/Orchid
			.forEach(p => {
				p.charIndex = null;
			});
		this._update('orchidEnabled', isOrchidEnabled);
		this._save();
	}

	_update(key, value) {
		this[key] = value;
		this.document[key] = value;
		return this;
	}

	_save() {
		this.document.save().catch(err => console.log('Error saving room:', err));
	}
}
