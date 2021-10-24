import { openPanel } from '../../../features/appSlice';
import { setGameValue, setRoomCode } from '../../../features/gameSlice';
import { setId, setJoinKey, setName } from '../../../features/playerSlice';

export const dispatchRoomJoinData = ({
	id,
	name,
	roomCode,
	hostId,
	hostKey,
	joinKey,
	dispatch,
}) => {
	dispatch(setGameValue({ key: 'isConnected', value: true }));
	dispatch(setGameValue({ key: 'hostId', value: hostId }));
	dispatch(setRoomCode(roomCode));
	dispatch(setId(id));
	dispatch(setJoinKey(joinKey));
	dispatch(setName(name));
	dispatch(openPanel('game-manager'));
	if (hostKey) dispatch(setGameValue({ key: 'hostKey', value: hostKey }));
};

export const saveJoinKeyInLocalStorage = ({ joinKey, name, roomCode }) => {
	const keyObj = JSON.parse(localStorage.getItem('joinKeys'));
	localStorage.setItem(
		'joinKeys',
		JSON.stringify({
			...keyObj,
			[`${roomCode}.${name}`]: joinKey,
		})
	);
};
