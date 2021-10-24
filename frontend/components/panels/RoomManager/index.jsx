import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closePanels } from '../../../features/appSlice';
import { setCommand } from '../../../features/gameSlice';
import {
	resetInputErrors,
	setIsInputValid,
	setNameInput,
	setRoomCodeError,
	setRoomCodeInput,
} from '../../../features/roomPanelSlice';
import useRoomManager from '../../../hooks/useRoomManager';
import RoomManagerInput from './Input';
import './style';

const RoomManager = () => {
	const {
		openPanelName,
		isOnlineGameConnected,
		onlineRoomCode,
		nameInput,
		nameError,
		roomCodeInput,
		roomCodeError,
		isInputValid,
		isPosting,
	} = useRoomManager.selectors();

	const {
		classes,
		contentClasses,
		nameErrorClasses,
		roomErrorClasses,
		roomExitClasses,
	} = useRoomManager.classes({
		isOnlineGameConnected,
		isPosting,
		nameError,
		openPanelName,
		roomCodeError,
	});

	const nameInputRef = useRef();
	const roomCodeInputRef = useRef();
	const baseElementRef = useRef();
	const dispatch = useDispatch();

	const joinRoom = () => {
		dispatch(resetInputErrors());
		if (isInputValid) return dispatch(setCommand('joinRoom'));

		// Give feedback to user, if an error message already exists
		setTimeout(() => {
			dispatch(setRoomCodeError('Enter a name and valid room code.'));
		}, 100);
	};

	const closePanel = e =>
		e.target === baseElementRef.current && dispatch(closePanels());

	// Focus name or roomCode input on open
	useEffect(() => {
		if (openPanelName === 'room')
			(nameInput ? roomCodeInputRef : nameInputRef).current.select();
	}, [openPanelName]);

	// Validate input
	useEffect(() => {
		if (nameInput.trim().length && roomCodeInput.trim().length === 4) {
			if (!isInputValid) dispatch(setIsInputValid(true));
		} else if (isInputValid) dispatch(setIsInputValid(false));
	}, [nameInput, roomCodeInput]);

	// Focus name input on error
	useEffect(() => {
		if (nameError) setTimeout(() => nameInputRef.current.select());
	}, [nameError]);

	// Focus room input on error
	useEffect(() => {
		if (roomCodeError)
			// Focus room code input; or, name input if entry is invalid
			setTimeout(() =>
				(nameInput.trim() ? roomCodeInputRef : nameInputRef).current.select()
			);
	}, [roomCodeError]);

	return (
		<div className={classes} onClick={closePanel} ref={baseElementRef}>
			<div className="panel-container">
				<div className="pan-header">Room</div>
				<div>
					<div className={contentClasses}>
						<div className="nameEntry">
							<RoomManagerInput
								name="pName"
								label="your name"
								reducer={setNameInput}
								error={[nameErrorClasses, nameError]}
								value={nameInput}
								onKeyDown={e => e.key === 'Enter' && joinRoom()}
								inputRef={nameInputRef}
								maxLength="14"
							/>
						</div>
						<RoomManagerInput
							name="roomCode"
							label="room code"
							reducer={setRoomCodeInput}
							error={[roomErrorClasses, roomCodeError]}
							value={roomCodeInput}
							onKeyDown={e => e.key === 'Enter' && joinRoom()}
							inputRef={roomCodeInputRef}
							maxLength="4"
							placeholder="XXXX"
							spellCheck="false"
						>
							<button
								className="bt roomJoin"
								onClick={joinRoom}
								disabled={!isInputValid || isPosting}
							/>
						</RoomManagerInput>

						<div className="createRoomSection">
							<span>or</span>
							<button
								className="bt roomCreate"
								onClick={() => dispatch(setCommand('createRoom'))}
							>
								create a new room
							</button>
						</div>
					</div>

					<div className={roomExitClasses}>
						<label disabled>Room code:</label>
						<input
							className="rm-inp roomCode"
							value={onlineRoomCode}
							disabled
						/>
						<button className="bt darkTan">Leave room</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomManager;
