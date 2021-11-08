import { setAccusation } from '../../features/accusationSlice';

export default {
	MAKE_ACCUSATION: {
		parameters: ['cards'],
		reducerName: 'RESOLVE_ACCUSATION',
		reducer: ({ dispatch, payload }) => dispatch(setAccusation(payload)),
	},
};
