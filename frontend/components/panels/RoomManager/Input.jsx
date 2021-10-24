import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RoomManagerInput = ({
	error,
	inputRef,
	label,
	name,
	reducer,
	children,
	...props
}) => {
	const isPosting = useSelector(state => state.roomPanel.isPosting);
	const dispatch = useDispatch();

	return (
		<>
			<label htmlFor={name}>Enter {label}:</label>
			<input
				id={name}
				className={`rm-inp ${name}`}
				onChange={e => dispatch(reducer(e.target.value))}
				disabled={isPosting}
				ref={inputRef}
				{...props}
			/>
			{children}
			<div className={error[0]}>{error[1]}</div>
		</>
	);
};

export default RoomManagerInput;
