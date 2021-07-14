export const HTTP_ERROR = {
	DB_CONNECT_FAILURE: { code: 500, error: 'Database failed to connect' },
	NO_ROOM_CODE: { code: 400, error: 'No room code specified' },
	ROOM_CODE_DOES_NOT_EXIST: {
		code: 404,
		culprit: 'roomCode',
		error: 'That room does not exist.',
	},
	GAME_IN_PROGRESS: {
		code: 409,
		culprit: 'room',
		error: 'A game is currently in progress.',
	},
	NAME_IN_USE: {
		code: 409,
		culprit: 'name',
		error: 'That name is already in use.'
	},
};
