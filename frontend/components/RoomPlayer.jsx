import React from 'react';

const RoomPlayer = ({
	charIndex,
	name,
	you,
	isHost,
	disabled,
	selected,
	onClick,
}) => {
	const classes = [
		'RoomPlayer',
		...(you ? ['you'] : ''),
		...(!name ? ['available'] : ''),
		...(isHost ? ['isHost'] : ''),
		...(disabled ? ['disabled'] : ''),
		...(selected ? ['selected'] : ''),
	].join(' ');

	const nameDisplay = name || 'Click to select character';

	return (
		<div className={classes} onClick={onClick}>
			<div className={`note note-${charIndex}`}></div>
			<div className="playerName">{nameDisplay}</div>
		</div>
	);
};

export default RoomPlayer;
