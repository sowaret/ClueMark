import express from 'express';
import { generateRoomCode, makeID } from './functions.js';
import { Room, Player } from './models.js';
import { HTTP_ERROR } from './enums.js';

const handleError = (res, caughtError) => {
	let json = { error: caughtError.toString() };

	// If thrown as enum
	let { code, ...errorEnum } = caughtError;
	if (errorEnum.error) json = errorEnum;
	else console.log(caughtError);

	return res.status(code || 500).json(json);
};

const createRoomDocuments = async name => {
	const code = await generateRoomCode( makeID(4) );
	const room = new Room({
		code,
		hostJoinKey: Math.floor(Math.random() * Date.now()),
	});
	const host = new Player({
		name, room,
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

const findJoinRoomDocuments = async ({ code, name, req }) => {
	const room = await Room.findOne({ code });
	if (!room) throw HTTP_ERROR.ROOM_CODE_DOES_NOT_EXIST;

	// Check if a player with this name is already in the room
	const foundPlayer = await Player.findOne({ room, name });

	// Do not allow new players to join if a game is active
	if (!foundPlayer && room.isActive) throw HTTP_ERROR.GAME_IN_PROGRESS;

	let player = foundPlayer;
	const isExistentPlayerAuthenticated =
		player && req.body.joinKey === player.joinKey;

	// If a player with that name already exists
	if (player) {
		// Do not allow player to re-join if the correct join key wasn't supplied
		if (!req.body.joinKey || !isExistentPlayerAuthenticated)
			throw HTTP_ERROR.NAME_IN_USE;

	} else {
		player = new Player({
			name, room,
			joinKey: Math.floor(Math.random() * Date.now()),
		});

		await player.save();
	}

	return { foundPlayer, player, room };
};

const validateJoinParams = req => {
	const name = (req.body.name || '').toUpperCase();
	const code = (req.body.roomCode || '').toUpperCase();

	if (!code) throw HTTP_ERROR.NO_ROOM_CODE;

	return { code, name };
};

const router = express.Router()
	.post('/createRoom', async (req, res) => {
		try {
			const { hostId, joinKey, roomCode } =
				await createRoomDocuments(req.body.name);

			return res.status(201).json({ hostId, joinKey, roomCode });

		} catch (err) { handleError(res, err) }
	})
	.post('/joinRoom', async (req, res) => {
		try {
			const { code, name } = validateJoinParams(req);
			const { foundPlayer, player, room } =
				await findJoinRoomDocuments({ code, name, req });

			return res.json({
				hostId: room.hostId,
				playerId: player._id,
				// Supply player's character index if they're rejoining
				...foundPlayer && { charIndex: player.charIndex },
				// Supply the join key if the player is new
				...!foundPlayer && { joinKey: player.joinKey },
				// Send the hostKey to update the client's redux store
				...req.body.joinKey === room.hostJoinKey
					&& { hostKey: room.hostJoinKey },
			});

		} catch (err) { handleError(res, err) }
	}); 

export default router;
