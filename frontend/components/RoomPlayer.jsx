import React from 'react';
import useClasses from '../hooks/useClasses';

const RoomPlayer = ({
	charIndex,
	name,
	you,
	isHost,
	disabled,
	selected,
	onClick,
}) => {
	const classes = useClasses(
		'RoomPlayer',
		you && 'you',
		!name && 'available',
		isHost && 'isHost',
		disabled && 'disabled',
		selected && 'selected'
	);
	const nameDisplay = name || 'Click to select character';

	return (
		<div className={classes} onClick={onClick}>
			<div className={`note note-${charIndex}`}></div>
			<div className="playerName">{nameDisplay}</div>
		</div>
	);
};

export default RoomPlayer;
