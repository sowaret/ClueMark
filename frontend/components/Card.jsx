import React from 'react';
import useClasses from '../hooks/useClasses';
import Note from './Note';
import './styles/Card';

const Card = ({ index, title, isGameActive, isSelected, onClick }) => {
	const classes = useClasses(
		'card',
		`cd-${index}`,
		isGameActive && 'cursor--pointer',
		isSelected && 'selected'
	);
	const hoverTitle = isGameActive ? 'Click to select card for suggestion' : '';

	return (
		<div className={classes}>
			<div className="title" title={hoverTitle} onClick={() => onClick(index)}>
				{title}
			</div>
			<Note cardIndex={index} noteIndex={0} />
			<Note cardIndex={index} noteIndex={1} />
			<Note cardIndex={index} noteIndex={2} />
		</div>
	);
};

export default Card;
