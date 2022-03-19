import { styled } from '@stitches/react';

export const DropdownTriggerRow = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	paddingBottom: '10px',
	marginRight: '3rem',

	button: {
		fontWeight: '$bold',
		color: '$teal12',
		fontSize: '$content16'
	},

	i: {
		fontSize: '10px',
		color: '$sage11',
		marginRight: '10px'
	},

	variants: {
		showDropdown: {
			true: {
				borderBottom: '1px solid $sage6'
			}
		}
	}
});

export const DropdownContent = styled('div', {
	padding: '18px 0'
});
