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

### Environment
- Create a `.env` file with the following variables:

	```
	API_PORT=3001
	# MongoDB connection string
	DB_ROUTE=mongodb://username:password@host/database
	# Comma-separated list of disallowed room codes
	DISALLOWED_CODES=CODE,ROOM,CLUE,ETCC
	WS_SERVER_PORT=8080
	```

### Frontend
- The port can be changed by editing the `-p` flag of the `start` command in `package.json`:

	```js
	"start": "parcel frontend/index.html -p 1235"
	```


## Running

### Frontend
- Run `npm start` in the project's directory.

### Backend
- Run `npm run server` in the project's directory.
