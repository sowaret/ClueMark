import disallowedCodes from './disallowedCodes.js';
import { Room } from './models.js';

export const generateRoomCode = async code => {
	try {
		if (disallowedCodes.includes(code))
			return await generateRoomCode( makeID(4) );

		const room = await Room.findOne({ code });
		if (room) return await generateRoomCode( makeID(4) );

		return code;

	} catch (err) {
		console.error('ERROR', err);
		throw err;
	}
};

export const makeID = length => {
	let res = '',
		chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		count = chars.length;

	for (let i = 0; i < length; i++) {
		res += chars.charAt(Math.floor(Math.random() * count))
	}

	return res;
};

export const send = (ws, data) => ws.send(JSON.stringify(data));
