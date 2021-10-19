import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePanels } from '../../features/appSlice';
import { setCommand } from '../../features/gameSlice';
import {
	resetInputErrors,
	setIsInputValid,
	setNameInput,
	setRoomCodeError,
	setRoomCodeInput,
} from '../../features/roomPanelSlice';
import './styles/RoomManager';

const RoomManager = () => {
	const { openPanelName } = useSelector(state => state.app);

	const isOnlineGameConnected = useSelector(state => state.game.isConnected);
	const onlineRoomCode = useSelector(state => state.game.roomCode);

	const nameInput = useSelector(state => state.roomPanel.nameInput);
	const nameError = useSelector(state => state.roomPanel.nameError);
	const nameInputRef = useRef();

	const roomCodeInput = useSelector(state => state.roomPanel.roomCodeInput);
	const roomCodeError = useSelector(state => state.roomPanel.roomCodeError);
	const roomCodeInputRef = useRef();

	const isInputValid = useSelector(state => state.roomPanel.isInputValid);
	const isPosting = useSelector(state => state.roomPanel.isPosting);

	const baseElementRef = useRef();
	const dispatch = useDispatch();

	const classes = [
		'panel',
		...(openPanelName === 'room' ? ['open'] : ''),
		...(isPosting ? ['post'] : ''),
	].join(' ');

	const contentClasses = [
		'roomEntry',
		...(isOnlineGameConnected ? ['disabled'] : ''),
	].join(' ');

	const nameErrorClasses = [
		'roomEntry-error',
		'pName-error',
		...(nameError ? ['show'] : ''),
	].join(' ');

	const roomErrorClasses = [
		'roomEntry-error',
		'roomCode-error',
		...(roomCodeError ? ['show'] : ''),
	].join(' ');

	const roomExitClasses = [
		'roomExit',
		...(isOnlineGameConnected ? ['enabled'] : ''),
	].join(' ');

	const createRoom = () => dispatch(setCommand('createRoom'));

	const joinRoom = () => {
		dispatch(resetInputErrors());
		// Give feedback to user, if an error message already exists
		if (!isInputValid)
			return setTimeout(() => {
				dispatch(setRoomCodeError('Enter a name and valid room code.'));
			}, 100);

		dispatch(setCommand('joinRoom'));
	};

	const handleKeyDown = e => e.key === 'Enter' && joinRoom();

	const closePanel = e =>
		e.target === baseElementRef.current && dispatch(closePanels());

	// Focus name or roomCode input on open
	useEffect(() => {
		if (openPanelName !== 'room') return;

		if (!nameInput) {
			nameInputRef.current.focus();
			return;
		}
		roomCodeInputRef.current.select();
	}, [openPanelName]);

	// Validate input
	useEffect(() => {
		if (nameInput.trim().length && roomCodeInput.trim().length === 4) {
			if (!isInputValid) dispatch(setIsInputValid(true));
			return;
		} else if (isInputValid) dispatch(setIsInputValid(false));
	}, [nameInput, roomCodeInput]);

	// Focus name input on error
	useEffect(() => {
		if (nameError) setTimeout(() => nameInputRef.current.select(), 0);
	}, [nameError]);

	// Focus room input on error
	useEffect(() => {
		if (!roomCodeError) return;

		// Focus name input instead if entry is invalid
		if (!nameInput.trim()) {
			setTimeout(() => nameInputRef.current.select(), 0);
			return;
		}

		setTimeout(() => roomCodeInputRef.current.select(), 0);
	}, [roomCodeError]);

	return (
		<div className={classes} onClick={closePanel} ref={baseElementRef}>
			<div className="panel-container">
				<div className="pan-header">Room</div>
				<div>
					<div className={contentClasses}>
						<div className="nameEntry">
							<label htmlFor="pName">Enter your name:</label>
							<input
								id="pName"
								className="rm-inp pName"
								value={nameInput}
								onChange={e => dispatch(setNameInput(e.target.value))}
								onKeyDown={handleKeyDown}
								disabled={isPosting}
								ref={nameInputRef}
								maxLength="14"
							/>
							<div className={nameErrorClasses}>{nameError}</div>
						</div>

						<label htmlFor="roomCode">Enter room code:</label>
						<input
							id="roomCode"
							className="rm-inp roomCode"
							value={roomCodeInput}
							onChange={e => dispatch(setRoomCodeInput(e.target.value))}
							onKeyDown={handleKeyDown}
							disabled={isPosting}
							ref={roomCodeInputRef}
							maxLength="4"
							placeholder="XXXX"
							spellCheck="false"
						/>
						<button
							className="bt roomJoin"
							onClick={joinRoom}
							disabled={!isInputValid || isPosting}
						/>
						<div className={roomErrorClasses}>{roomCodeError}</div>

						<div className="createRoomSection">
							<span>or</span>
							<button className="bt roomCreate" onClick={createRoom}>
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
