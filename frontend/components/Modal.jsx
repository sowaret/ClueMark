import React from 'react';
import useClasses from '../hooks/useClasses';
import './styles/Modal.css';

const Modal = ({ name, title, isVisible, children }) => {
	const classes = useClasses('modal', isVisible && 'visible');
	const contentClasses = useClasses('modal__content', name);

	return (
		<div className={classes}>
			<div className="modal__cover" />
			<div className={contentClasses}>
				<div className="modal__title">{title}</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
