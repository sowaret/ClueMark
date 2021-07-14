import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const booleanDefaultFalse = { type: Boolean, default: false };
const { ObjectId } = Schema.Types;
const PlayerRef = { ref: 'Player', type: ObjectId };
const RoomRef = { ref: 'Room', type: ObjectId };

export const Room = mongoose.model('Room', new Schema({
	code: String,
	hostId: ObjectId,
	hostJoinKey: Number,
	isActive: booleanDefaultFalse,
	activeGamePlayers: [PlayerRef],
	poisonEnabled: booleanDefaultFalse,
	orchidEnabled: booleanDefaultFalse,
}));

export const Player = mongoose.model('Player', new Schema({
	room: RoomRef,
	name: String,
	joinKey: Number,
	charIndex: Number,
	cardsInHand: [Number],
}));
