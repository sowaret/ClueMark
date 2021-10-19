import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCommand,
	setShowPoison,
	setUseDrOrchid,
} from '../../../features/gameSlice';

const Options = ({ show }) => {
	// Any game
	const useDrOrchid = useSelector(state => state.game.useDrOrchid);
	const showPoison = useSelector(state => state.game.showPoison);
	// Online game
	const isOnlineGameConnected = useSelector(state => state.game.isConnected);
	const dispatch = useDispatch();

	const toggleOrchid = e =>
		isOnlineGameConnected
			? dispatch(setCommand(`setUseDrOrchid.${e.target.checked}`))
			: dispatch(setUseDrOrchid(e.target.checked));

	const togglePoison = e =>
		isOnlineGameConnected
			? dispatch(setCommand(`setShowPoison.${e.target.checked}`))
			: dispatch(setShowPoison(e.target.checked));

	return (
		show && (
			<div className="hide-active-game marTop10">
				<input
					type="checkbox"
					id="useDrOrchid"
					checked={useDrOrchid}
					onChange={toggleOrchid}
				/>
				<label htmlFor="useDrOrchid">Swap Mrs. White for Dr. Orchid</label>

				<div className="game-manager__section-header">Weapons</div>
				<input
					type="checkbox"
					id="showPoison"
					checked={showPoison}
					onChange={togglePoison}
				/>
				<label htmlFor="showPoison">Show poison</label>

				<div className="game-manager__section-header empty show-room-game" />
			</div>
		)
	);
};

export default Options;
