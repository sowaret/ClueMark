import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/index.js';
import createWebSocketServer from './websocket/webSocketServer.js';

const connectToDatabase = () =>
	mongoose.connect(process.env.DB_ROUTE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

const setUpRouterAndListen = () => {
	const app = express().use(cors()).use(express.json()).use('/api', apiRoutes);

	app.listen(process.env.API_PORT, () =>
		console.log(
			`Connection successful, listening on port ${process.env.API_PORT}.`
		)
	);
};

const handleConnectError = err =>
	console.log('Could not connect to database:', err.toString());

connectToDatabase().then(setUpRouterAndListen).catch(handleConnectError);

// Handle errors after initial connection
mongoose.connection.on(
	'error',
	console.error.bind(console, 'MongoDB connection error:')
);

createWebSocketServer(process.env.WS_SERVER_PORT);
