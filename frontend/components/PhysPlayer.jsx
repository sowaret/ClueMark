import React from 'react';
import useClasses from '../hooks/useClasses';

const PhysPlayer = ({ player, enabled, onClick }) => {
	const classes = useClasses('note', `note-${player}`, enabled && 'checked');
	const togglePlayer = () => onClick(player);
	return <div className={classes} onClick={togglePlayer} />;
};

export default PhysPlayer;
