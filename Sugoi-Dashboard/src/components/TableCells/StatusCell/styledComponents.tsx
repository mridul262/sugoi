import { styled, css } from '@stitches/react';

export const StyledTableCell = styled('div', {
	fontSize: '14px',
	color: '$teal9'
});

export const ModalCss = css({
	background: 'red'
});
export const Popup = styled('div', {
	opacity: '1',
	padding: ' 2rem 3rem !important',
	width: '80vw',
	height: '100vh',
	zIndex: '9999999 !important',
	position: 'absolute !important',
	top: '0',
	bottom: '0',
	right: ' 0',
	backgroundColor: '$sage2'
});

export const HeaderRow = styled('div', {
	display: 'flex',
	alignItems: 'center',
	color: '$teal10',
	marginBottom: '3rem',

	h2: {
		fontWeight: '$semibold',
		fontSize: '$subtitle24'
	}
});

export const Icon = styled('i', {
	color: '$teal9',
	fontSize: '$subtitle24',
	marginRight: '1rem'
});

// Make css radix
export const OverlayCss = css({
	position: 'fixed',
	zIndex: '9999999 !important',
	left: '0',
	bottom: '0',
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	width: '100%',
	height: '100%'
});
