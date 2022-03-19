import { styled, css } from '@stitches/react';

export const Popup = styled('div', {
	opacity: '1',
	width: '80vw',
	height: '100vh',
	zIndex: '9999999 !important',
	position: 'absolute !important',
	top: '0',
	bottom: '0',
	right: ' 0',
	backgroundColor: '$sage1'
});

export const OverlayCss = css({
	position: 'fixed',
	zIndex: '999999999 !important',
	left: '0',
	bottom: '0',
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	width: '100%',
	height: '100%'
});

export const ModalCss = css({
	position: 'absolute'
});
