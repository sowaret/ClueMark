import axios from 'axios';
import { API_URL } from '../../../enums';
import { setCommand, setGameValue } from '../../../features/gameSlice';
import {
	resetInputErrors,
	setIsPosting,
	setNameError,
} from '../../../features/roomPanelSlice';
import { wsCreateRoom } from '../../../webSocketModule';
import { dispatchRoomJoinData, saveJoinKeyInLocalStorage } from './shared';

const handleRoomCreate = async ({ name, dispatch }) => {
	const res = await axios.post(`${API_URL}/createRoom`, { name });
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

export default createRoom = async ({ nameInput, dispatch }) => {
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
