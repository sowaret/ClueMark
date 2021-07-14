import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '../features/cardsSlice';
import Card from './Card';
import './styles/Section';

const Section = ({ type, items }) => {
	const isGameActive = useSelector(state => state.game.isGameActive);
	const selectedCard = useSelector(state => state.cards.selection[type]);
	const dispatch = useDispatch();

	const onCardClick = cardIndex => isGameActive
		&& dispatch(setSelection({ type, cardIndex }));

	// Create card list
	const cards = items.map(({ index, name }, key) =>
		React.createElement(
			Card,
			{
				index,
				title: name,
				isGameActive,
				isSelected: selectedCard === index,
				onClick: onCardClick,
				key,
			}
		)
	);

	return (
		<div className={`sec-${type}`}>
			<div className="header">{`${type}s`}</div>
			{cards}
		</div>
	);
};

export default Section;
