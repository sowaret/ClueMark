import { buildWebSocketModule } from '@sowaret/redux-websocket-middleware';
import { definitions, otherReducers } from './websocket/actions';

const { actions, actionEnumList, responseReducers } = buildWebSocketModule({
	definitions,
	otherReducers,
});

module.exports = { ...actions, actions, actionEnumList, responseReducers };
