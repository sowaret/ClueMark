import { useSelector } from 'react-redux';
import useClasses from './useClasses';

export default {
	classes: ({
		isOnlineGameConnected,
		isPosting,
		nameError,
		openPanelName,
		roomCodeError,
	}) => ({
		classes: useClasses(
			'panel',
			openPanelName === 'room' && 'open',
			isPosting && 'post'
		),
		contentClasses: useClasses(
			'roomEntry',
			isOnlineGameConnected && 'disabled'
		),
		nameErrorClasses: useClasses(
			'roomEntry-error',
			'pName-error',
			nameError && 'show'
		),
		roomErrorClasses: useClasses(
			'roomEntry-error',
			'roomCode-error',
			roomCodeError && 'show'
		),
		roomExitClasses: useClasses('roomExit', isOnlineGameConnected && 'enabled'),
	}),
	selectors: () => ({
		openPanelName: useSelector(state => state.app.openPanelName),
		isOnlineGameConnected: useSelector(state => state.game.isConnected),
		onlineRoomCode: useSelector(state => state.game.roomCode),
		nameInput: useSelector(state => state.roomPanel.nameInput),
		nameError: useSelector(state => state.roomPanel.nameError),
		roomCodeInput: useSelector(state => state.roomPanel.roomCodeInput),
		roomCodeError: useSelector(state => state.roomPanel.roomCodeError),
		isInputValid: useSelector(state => state.roomPanel.isInputValid),
		isPosting: useSelector(state => state.roomPanel.isPosting),
	}),
};
