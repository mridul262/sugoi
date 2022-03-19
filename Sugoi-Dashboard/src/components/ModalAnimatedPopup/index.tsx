import React from 'react';
import Modal from 'react-modal';

/* Styling */
import { Popup, OverlayCss, ModalCss } from './styledComponents';

interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
}

const ModalAnimatedPopup = (props: Props) => {
	const { children, isOpen, setOpen } = props;
	return (
		<Modal
			shouldCloseOnEsc
			isOpen={isOpen}
			onRequestClose={() => setOpen(false)}
			className={ModalCss()}
			overlayClassName={`${OverlayCss()}`}
		>
			<Popup
				id="manageCreators"
				className={`animate__animated 
				animate__slideInRight animate__faster`}
			>
				{children}
			</Popup>
		</Modal>
	);
};

export default ModalAnimatedPopup;
