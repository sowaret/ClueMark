import React from 'react';
import useNoteValue from '../hooks/useNoteValue';
import './styles/Note';

const Note = ({ cardIndex, noteIndex }) => {
	const { noteValue, cycleValue, markX, markCircle } = useNoteValue({
		cardIndex,
		noteIndex,
	});

	// Disable scroll activation
	const disableMiddleClick = e => e.button === 1 && e.preventDefault();

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
