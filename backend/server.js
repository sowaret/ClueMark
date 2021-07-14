import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { API_PORT, DB_ROUTE, WS_SERVER_PORT } from './config.js';
import apiRoutes from './routes.js';
import createWebSocketServer from './websocket/webSocketServer.js';

const connectToDatabase = _ => mongoose
	.connect(DB_ROUTE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

const setUpRouterAndListen = _ => {
	const app = express()
		.use( cors() )
		.use( express.json() )
		.use('/api', apiRoutes);

	app.listen(API_PORT, _ =>
		console.log(`Connection successful, listening on port ${API_PORT}.`)
	);
};

const handleConnectError = err =>
	console.log('Could not connect to database:', err.toString());

connectToDatabase()
	.then(setUpRouterAndListen)
	.catch(handleConnectError);

// Handle errors after initial connection
mongoose.connection.on(
	'error',
	console.error.bind(console, 'MongoDB connection error:')
);

createWebSocketServer(WS_SERVER_PORT);
