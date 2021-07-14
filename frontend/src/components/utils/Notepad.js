import React from 'react';
import { cardList as cards } from '../../features/utils/cardList';
import Section from '../Section';

const createNotepadSections = () => {
	let type = cards[0].type; // Begin with first card type, i.e. Suspects
	let cardList = [];
	const Sections = [];

	cards.map((card, index) => {
		const isLastCard = index === cards.length - 1;
		const isNewSection = card.type && card.type !== type;
		card = { ...card, index };

		if (isLastCard) cardList.push(card); // Push final card before finishing map

		if (isNewSection || isLastCard) {
			Sections.push(
				<Section
					type={type}
					items={[...cardList]}
					key={type}
				/>
			);
			if (isLastCard) return;

			type = card.type;
			cardList = [];
		}

		cardList.push(card);
	});

	return Sections;
};

export default createNotepadSections();
