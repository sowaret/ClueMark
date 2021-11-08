import axios from 'axios';
import { API_URL } from '../../../enums';
import { setCommand } from '../../../features/gameSlice';
import {
	setIsPosting,
	setNameError,
	setRoomCodeError,
} from '../../../features/roomPanelSlice';
import { wsJoinRoom } from '../../../webSocketModule';
import { dispatchRoomJoinData, saveJoinKeyInLocalStorage } from './shared';

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
	const res = await axios.post(`${API_URL}/joinRoom`, joinParams);
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

export default joinRoom = async ({
	isInputValid,
	nameInput,
	roomCodeInput,
	dispatch,
}) => {
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
