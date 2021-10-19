export default class Deck {
	constructor(wsRoom) {
		this.room = wsRoom;
		this.cards = {
			Suspects: [
				{ name: 'Miss Scarlet', index: 0 },
				{ name: 'Mr. Green', index: 1 },
				{ name: 'Colonel Mustard', index: 2 },
				{ name: 'Mrs. White', index: 3 },
				{ name: 'Mrs. Peacock', index: 4 },
				{ name: 'Professor Plum', index: 5 },
				{ name: 'Dr. Orchid', index: 6 },
			],
			Weapons: [
				{ name: 'Candlestick', index: 7 },
				{ name: 'Knife', index: 8 },
				{ name: 'Lead pipe', index: 9 },
				{ name: 'Revolver', index: 10 },
				{ name: 'Rope', index: 11 },
				{ name: 'Wrench', index: 12 },
				{ name: 'Poison', index: 13 },
			],
			Rooms: [
				{ name: 'Kitchen', index: 14 },
				{ name: 'Ballroom', index: 15 },
				{ name: 'Conservatory', index: 16 },
				{ name: 'Dining Room', index: 17 },
				{ name: 'Billiard Room', index: 18 },
				{ name: 'Library', index: 19 },
				{ name: 'Lounge', index: 20 },
				{ name: 'Hall', index: 21 },
				{ name: 'Study', index: 22 },
			],
		};

		this.removeCard(wsRoom.orchidEnabled ? 'Mrs. White' : 'Dr. Orchid');
		if (!wsRoom.poisonEnabled) this.removeCard('Poison');

		return this;
	}

	removeCard(card) {
		const type = card === 'Poison' ? 'Weapons' : 'Suspects';
		this.cards[type] = this.cards[type].filter(a => a.name !== card);
	}

	shuffle(cards) {
		// Fisher-Yates shuffle
		let i = cards.length,
			j;
		while (i) {
			j = Math.floor(Math.random() * i--);
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		return cards;
	}

	chooseSolution() {
		// Choose a random solution
		const { cards } = this;
		const solution = {};
		let cardList = [];

		// Select a card of each type, suspect, weapon, room
		for (const type in cards) {
			solution[type] = this.shuffle(cards[type])[0];

			cardList = [
				...cardList,
				// Add the rest of the cards
				...cards[type].filter(x => x !== solution[type]),
			];
		}

		this.room.solution = solution;
		this.cards = this.shuffle(cardList); // Shuffle the remaining cards
		return this;
	}

	deal() {
		const { wsPlayers } = this.room;
		const hands = {};

		wsPlayers.forEach(player => {
			hands[player.name] = {
				type: 'START_GAME',
				cards: [],
			};
		});

		let dealIndex = 0;
		while (dealIndex < this.cards.length) {
			const playerIndex = dealIndex % wsPlayers.length;
			const playerName = wsPlayers[playerIndex].name;
			// Deal cards to each player one by one
			hands[playerName].cards.push(this.cards[dealIndex]);
			dealIndex++;
		}

		return hands;
	}
}
