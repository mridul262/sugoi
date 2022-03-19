import { styled } from '@stitches/react';

export const StyledSectionHeader = styled('div', {
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	borderBottom: '1px solid $sage6',
	lineHeight: '20px',
	fontSize: '$content16',
	color: '$teal12',
	fontWeight: '$bold',
	fontFamily: 'Poppins, sans-serif',
	paddingBottom: '10px',
	marginBottom: '10px',

	i: {
		marginRight: '10px'
	},

	button: {
		marginRight: '18px'
	}
});
