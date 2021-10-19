import WSRoom from './WSRoom.js';

export default class WSRoomList {
	constructor() {
		this.rooms = {};
	}

	getOrCreateWSRoom(roomDocument) {
		const id = roomDocument._id;
		let room = this.rooms[id];

		// If WSRoom object for this Room hasn't been created yet
		if (!room) {
			room = new WSRoom(roomDocument);
			this.rooms[id] = room;
		}

		return room;
	}
}
