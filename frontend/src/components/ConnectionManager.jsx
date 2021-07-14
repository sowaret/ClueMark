import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, joinRoom } from './utils/ConnectionManager';

const ConnectionManager = _ => {
	const command = useSelector(state => state.game.command);
	const isInputValid = useSelector(state => state.roomPanel.isInputValid);
	const nameInput = useSelector(state => state.roomPanel.nameInput);
	const roomCodeInput = useSelector(state => state.roomPanel.roomCodeInput);
	const dispatch = useDispatch();

	// On mount
	useEffect(_ => {
		// Initialize local storage
		if (!localStorage.getItem('joinKeys'))
			localStorage.setItem('joinKeys', '{}');
		if (!localStorage.getItem('roomCharIndexes'))
			localStorage.setItem('roomCharIndexes', '{}');
	}, []);

	// Handle commands
	useEffect(_ => {
		if (!command) return;

		if (command === 'createRoom') createRoom({ nameInput, dispatch });
		else if (command === 'joinRoom')
			joinRoom({ isInputValid, nameInput, roomCodeInput, dispatch });
	}, [command]);

	return <></>;
};

export default ConnectionManager;
