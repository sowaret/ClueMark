export default class WSPlayer {
	constructor(client, wsRoom, playerDocument) {
		this.document = playerDocument;
		this.client = client;

		this.room = wsRoom;
		this.id = playerDocument.id;
		this.isHost = false;
		this.name = playerDocument.name;

		wsRoom.joinPlayer(this);
	}

	update(key, value) {
		this[key] = value;
		this.document[key] = value;
		return this;
	}

	save() {
		this.document.save().catch(err =>
			console.error('Error saving player:', err)
		);
	}
}
