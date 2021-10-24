import disallowedCodes from '../disallowedCodes.js';
import { generateJoinKey } from '../functions.js';
import { Room, Player } from '../models.js';
import handleError from './handleError.js';

const makeID = length => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const count = chars.length;

	let res = '';
	for (let i = 0; i < length; i++) {
		res += chars.charAt(Math.floor(Math.random() * count));
	}

	return res;
};

const generateRoomCode = async () => {
	const code = makeID(4);
	try {
		if (disallowedCodes.includes(code)) return await generateRoomCode();

		const room = await Room.findOne({ code });
		if (room) return await generateRoomCode();

		return code;
	} catch (err) {
		console.error('ERROR', err);
		throw err;
	}
};

const createRoomWithHostName = async name => {
	const code = await generateRoomCode();
	const room = new Room({
		code,
		hostJoinKey: generateJoinKey(),
	});
	const host = new Player({
		name,
		room,
		joinKey: room.hostJoinKey,
	});

	room.hostId = host._id;
	await host.save();
	await room.save();

	return {
		hostId: host._id,
		joinKey: host.joinKey,
		roomCode: code,
	};
};

// createRoomHandler
export default async (req, res) => {
	try {
		const newRoomData = await createRoomWithHostName(req.body.name);
		return res.status(201).json(newRoomData);
	} catch (err) {
		handleError(res, err);
	}
};
