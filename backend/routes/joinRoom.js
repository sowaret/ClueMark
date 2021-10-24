import { HTTP_ERROR } from '../enums.js';
import { generateJoinKey } from '../functions.js';
import { Room, Player } from '../models.js';
import handleError from './handleError.js';

const validateJoinParams = req => {
	const name = (req.body.name || '').toUpperCase();
	const code = (req.body.roomCode || '').toUpperCase();

	if (!code) throw HTTP_ERROR.NO_ROOM_CODE;

	return { code, name };
};

const validatePlayerRejoin = async ({ name, room, req }) => {
	// Check if a player with this name is already in the room
	const foundPlayer = await Player.findOne({ room, name });

	// Do not allow new players to join if a game is active
	if (!foundPlayer && room.isActive) throw HTTP_ERROR.GAME_IN_PROGRESS;

	const isExistentPlayerAuthenticated =
		foundPlayer && req.body.joinKey === foundPlayer.joinKey;

	// If a player with that name already exists
	// Do not allow player to re-join if the correct join key wasn't supplied
	if (foundPlayer && (!req.body.joinKey || !isExistentPlayerAuthenticated))
		throw HTTP_ERROR.NAME_IN_USE;

	return foundPlayer;
};

const getJoinDocuments = async ({ code, name, req }) => {
	const room = await Room.findOne({ code });
	if (!room) throw HTTP_ERROR.ROOM_CODE_DOES_NOT_EXIST;

	const foundPlayer = await validatePlayerRejoin({ name, room, req });
	const player =
		foundPlayer ||
		(await new Player({
			name,
			room,
			joinKey: generateJoinKey(),
		}).save());

	return { foundPlayer, player, room };
};

// joinRoomHandler
export default async (req, res) => {
	try {
		const { code, name } = validateJoinParams(req);
		const { foundPlayer, player, room } = await getJoinDocuments({
			code,
			name,
			req,
		});

		return res.json({
			hostId: room.hostId,
			playerId: player._id,
			// Supply player's character index if they're rejoining
			...(foundPlayer && { charIndex: player.charIndex }),
			// Supply the join key if the player is new
			...(!foundPlayer && { joinKey: player.joinKey }),
			// Send the hostKey to update the client's redux store
			...(req.body.joinKey === room.hostJoinKey && {
				hostKey: room.hostJoinKey,
			}),
		});
	} catch (err) {
		handleError(res, err);
	}
};
