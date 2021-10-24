import { Router } from 'express';
import createRoomHandler from './createRoom.js';
import joinRoomHandler from './joinRoom.js';

const router = Router()
	.post('/createRoom', createRoomHandler)
	.post('/joinRoom', joinRoomHandler);

export default router;
