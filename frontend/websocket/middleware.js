import { createSocketMiddleware } from '@sowaret/redux-websocket-middleware';
import {
	actionEnumList,
	responseReducers,
	wsSelectCharacter,
} from '../webSocketModule';

export default createSocketMiddleware({
	actionEnumList,
	onReducerResponse: ({ dispatch, res, type }) => {
		if (!res) return;
		if (type === 'POPULATE_STATE')
			dispatch(wsSelectCharacter(res.rejoinCharacterIndex));
	},
	responseReducers,
});
