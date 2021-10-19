import axios from 'axios';
import { openPanel } from '../../features/appSlice';
import {
	setCommand,
	setGameValue,
	setRoomCode,
} from '../../features/gameSlice';
import { setId, setJoinKey, setName } from '../../features/playerSlice';
import {
	resetInputErrors,
	setIsPosting,
	setNameError,
	setRoomCodeError,
} from '../../features/roomPanelSlice';
import { wsCreateRoom, wsJoinRoom } from '../../webSocketModule';
import { backendURL } from '../../config';

const dispatchRoomJoinData = data => {
	const { id, name, roomCode, hostId, hostKey, joinKey, dispatch } = data;
	dispatch(setGameValue({ key: 'isConnected', value: true }));
	dispatch(setGameValue({ key: 'hostId', value: hostId }));
	dispatch(setRoomCode(roomCode));
	dispatch(setId(id));
	dispatch(setJoinKey(joinKey || data.joinKey));
	dispatch(setName(name));
	dispatch(openPanel('game-manager'));
	if (hostKey) dispatch(setGameValue({ key: 'hostKey', value: hostKey }));
};

const saveJoinKeyInLocalStorage = ({ joinKey, name, roomCode }) => {
	const keyObj = JSON.parse(localStorage.getItem('joinKeys'));
	localStorage.setItem(
		'joinKeys',
		JSON.stringify({
			...keyObj,
			[`${roomCode}.${name}`]: joinKey,
		})
	);
};

// ===========
// Room create
// ===========
const handleRoomCreate = async ({ name, dispatch }) => {
	const res = await axios.post(`${backendURL}/createRoom`, { name });
	const { hostId, joinKey, roomCode } = res.data;

	dispatchRoomJoinData({
		hostId,
		joinKey,
		name,
		roomCode,
		dispatch,
		id: hostId,
		hostKey: joinKey,
	});

	// Populate socket connection with this player's info
	dispatch(
		wsCreateRoom({
			hostId,
			roomCode,
			hostKey: joinKey,
		})
	);

	// Save host's join key in local storage so they can re-join later
	saveJoinKeyInLocalStorage({ joinKey, name, roomCode });
};

export const createRoom = async ({ nameInput, dispatch }) => {
	if (!nameInput.trim().length) return dispatch(setNameError('Enter a name.'));

	const name = nameInput.toUpperCase();

	dispatch(resetInputErrors());
	dispatch(setIsPosting(true));

	try {
		await handleRoomCreate({ name, dispatch });
	} catch (err) {
		if (!err.response) {
			dispatch(setNameError('Error creating room.'));
			throw err;
		}

		err = err.response.data;
		const [key, value] = [`${err.culprit}Error`, err.error];
		dispatch(setGameValue({ key, value }));
	}

	dispatch(setCommand(null));
	dispatch(setIsPosting(false));
};

// =========
// Room join
// =========
const getJoinParams = ({ nameInput, roomCodeInput }) => {
	const name = nameInput.toUpperCase();
	const roomCode = roomCodeInput.toUpperCase();
	const joinKeyObj = JSON.parse(localStorage.getItem('joinKeys'));
	const joinKey = joinKeyObj[`${roomCode}.${name}`];

	return {
		name,
		roomCode,
		// Supply join key if this player is re-joining
		...(joinKey && { joinKey }),
	};
};

const handleRoomJoin = async (joinParams, dispatch) => {
	const res = await axios.post(`${backendURL}/joinRoom`, joinParams);
	const { name, roomCode, joinKey } = joinParams;
	const { hostKey, playerId } = res.data;
	const _joinKey = joinKey || res.data.joinKey;

	dispatchRoomJoinData({
		hostKey,
		name,
		roomCode,
		id: playerId,
		joinKey: _joinKey,
		dispatch,
	});

	// Notify all other players of join
	dispatch(
		wsJoinRoom({
			playerId: playerId,
			playerName: name,
			joinKey: _joinKey,
		})
	);

	// Save join key if player is new
	if (res.data.joinKey)
		saveJoinKeyInLocalStorage({
			name,
			roomCode,
			joinKey: res.data.joinKey,
		});
};

export const joinRoom = async data => {
	const { isInputValid, nameInput, roomCodeInput, dispatch } = data;
	if (!isInputValid) return; // Error is indicated to user via RoomManager

	dispatch(setIsPosting(true));
	const joinParams = getJoinParams({ nameInput, roomCodeInput });

	try {
		await handleRoomJoin(joinParams, dispatch);
	} catch (err) {
		if (!err.response) {
			dispatch(setRoomCodeError('Error joining room.'));
			throw err;
		}

		err = err.response.data;
		const reducer = err.culprit === 'name' ? setNameError : setRoomCodeError;
		dispatch(reducer(err.error));
	}

	dispatch(setCommand(null));
	dispatch(setIsPosting(false));
};
