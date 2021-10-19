import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../features/cardsSlice';
import './styles/Note';

const mapOnlinePlayersToEnabledCharacterState = playerSlots =>
	Array.from({ length: 8 }).map((_, i) => !!playerSlots[i]);

const Note = ({ cardIndex, noteIndex }) => {
	const noteValue = useSelector(
		state => state.cards.cards[cardIndex].notes[noteIndex]
	);

	// Get the list of enabled characters
	const isOnlineGame = useSelector(state => state.game.isConnected);
	const playerCharacters = useSelector(state => state.game.playerCharacters);
	const playerSlots = useSelector(state => state.game.playerSlots);
	const enabledCharacters = isOnlineGame
		? mapOnlinePlayersToEnabledCharacterState(playerSlots)
		: playerCharacters;

	const dispatch = useDispatch();

	const setValue = value => dispatch(setNote({ cardIndex, noteIndex, value }));

	// Reset value using identical value
	const setOrResetValue = newValue =>
		setValue(newValue === noteValue ? 0 : newValue);

	const cycleValue = () => {
		// Reset circle or X
		if (noteValue < 0) return setValue(0);

		let _value = noteValue;
		// Increment value
		_value++;
		// Skip any missing characters
		while (enabledCharacters[_value] === false) _value++;
		// Reset if no further characters
		if (_value > 7) _value = 0;

		setValue(_value);
	};

	// Event handlers
	// Disable scroll activation
	const disableMiddleClick = e => e.button === 1 && e.preventDefault();

	// contextmenu
	const markX = e => {
		if (e.shiftKey) return;
		e.preventDefault();
		setOrResetValue(-1);
	};

	// mouseup middle-click
	const markCircle = e => e.button === 1 && setOrResetValue(-2);

	return (
		<div
			className={`note note-${noteValue}`}
			onClick={cycleValue}
			onMouseDown={disableMiddleClick}
			onContextMenu={markX}
			onMouseUp={markCircle}
		/>
	);
};

export default Note;
