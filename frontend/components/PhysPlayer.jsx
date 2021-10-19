import React from 'react';

const PhysPlayer = ({ player, enabled, onClick }) => {
	const classes = [
		'note',
		`note-${player}`,
		...(enabled ? ['checked'] : ''),
	].join(' ');

	const togglePlayer = () => onClick(player);

	return <div className={classes} onClick={togglePlayer} />;
};

export default PhysPlayer;
