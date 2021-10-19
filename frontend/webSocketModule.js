import { buildWebSocketModule } from '@sowaret/redux-websocket-middleware';
import definitions from './websocket/actions';

const { actions, actionEnumList, responseReducers } = buildWebSocketModule({
	definitions,
});

module.exports = { ...actions, actions, actionEnumList, responseReducers };
