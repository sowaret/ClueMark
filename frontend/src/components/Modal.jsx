import React from 'react';
import './styles/Modal.css';

const Modal = ({ name, title, isVisible, children }) => {
	const classes = [
		'modal',
		...isVisible ? ['visible'] : '',
	].join(' ');

	const contentClasses = ['modal__content', name].join(' ');

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
