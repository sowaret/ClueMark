import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../features/cardsSlice';
import useEnabledCharacters from './useEnabledCharacters';

export default useNoteValue = ({ cardIndex, noteIndex }) => {
	const enabledCharacters = useEnabledCharacters();
	const noteValue = useSelector(
		state => state.cards.cards[cardIndex].notes[noteIndex]
	);

	const dispatch = useDispatch();
	const setValue = value => dispatch(setNote({ cardIndex, noteIndex, value }));
	// Reset value using identical value
	const setOrResetValue = newValue =>
		setValue(newValue === noteValue ? 0 : newValue);

	return {
		noteValue,
		cycleValue: () => {
			// Reset circle or X
			if (noteValue < 0) return setValue(0);

			let value = noteValue;
			// Increment value and skip any missing characters
			value++;
			while (enabledCharacters[value] === false) value++;
			// Reset if no further characters
			if (value > 7) value = 0;

			setValue(value);
		},
		markX: e => {
			if (e.shiftKey) return; // Enable contextmenu
			e.preventDefault();
			setOrResetValue(-1);
		},
		markCircle: e => e.button === 1 && setOrResetValue(-2),
	};
};
