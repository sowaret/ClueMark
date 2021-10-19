import {
	bootWhiteOrchid,
	setShowPoison,
	setUseDrOrchid,
} from '../../features/gameSlice';

export default {
	SET_USE_DR_ORCHID: {
		parameters: 'enabled',
		reducer: ({ dispatch, payload }) => {
			dispatch(setUseDrOrchid(payload.enabled));
			dispatch(bootWhiteOrchid());
		},
	},
	SET_SHOW_POISON: {
		parameters: 'show',
		reducer: ({ dispatch, payload }) => dispatch(setShowPoison(payload.show)),
	},
};
