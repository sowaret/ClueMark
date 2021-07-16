# ClueMark
ClueMark is a web-based Clue game notepad that can be used in place of pencil and paper, and also includes optional shared-room functionalities that allow for easier management of card shuffling and dealing and making suggestions to other players.


## Features
- ✨ UI inspired by the Clue: 50th Anniversary Edition board game notepad
- ✏ Note marker options to match the character colours of other players in a physical game, as well as cross and circle markers (similar to the Clue PC game from 1998)

### Online functionality
- 🚪 Ability to create rooms that others can join (via 4-letter code)
- ♟️ Room host options to accommodate game boxes that swap Mrs. White for Dr. Orchid and add the Poison weapon
- 🃏 Automatic card shuffling and dealing
- 👉 UI to build, send, and disprove suggestions during the game


## [Feature Showcase Video](https://youtu.be/qTOGdZtpmdg)

[![Preview of feature showcase video](https://i3.ytimg.com/vi/qTOGdZtpmdg/maxresdefault.jpg)](https://youtu.be/qTOGdZtpmdg)


## Installation
Clone the repository and run `npm install` in the project's directory.


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
