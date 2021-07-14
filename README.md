# ClueMark
ClueMark is a web-based Clue game notepad that can be used in place of pencil and paper, and also includes optional shared-room functionalities that allow for easier management of card shuffling and dealing and making suggestions to other players.


## Installation
Run `npm install` in the project's directory.


## Setup

### Frontend
- Create a file at `frontend/src/config.js` with the following export:

	```js
	export const backendURL = '<http(s)>://<hostname>:<API_PORT>/api';
	```

- The port can be changed by editing the `-p` flag of the `start` command in `package.json`:

	```js
	"start": "parcel frontend/index.html -p 1235"
	```

### Backend
- Create a file at `backend/config.js` with the following exports:

	```js
	export const API_PORT = 3001;
	// MongoDB connection string
	export const DB_ROUTE = 'mongodb://username:password@host/database';
	export const WS_SERVER_PORT = 8080;
	```

- Create a file at `backend/disallowedCodes.js` containing the following:

	```js
	module.exports = [ /* Comma-separated list of disallowed codes */ ];
	```


## Running

### Frontend
- Run `npm start` in the project's directory.

### Backend
- Run `npm run server` in the project's directory.
