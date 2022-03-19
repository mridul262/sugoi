import { styled } from '@stitches/react';

export const StyledIconButton = styled('button', {
	background: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '30px',
	height: '30px',
	borderRadius: '7px',
	transition: 'all 0.2s ease-in-out',

	variants: {
		hasBackground: {
			true: {
				background: '$sage3'
			}
		},

		changeColorOnHover: {
			true: {
				'&:hover': {
					i: {
						fill: '$teal9',
						color: '$teal9'
					}
				}
			}
		}
	},

	'&:hover': {
		background: '$sage4'
	},

	i: {
		transition: 'all 0.2s ease-in-out',
		fill: '$sage9',
		color: '$sage9',
		fontSize: '22px'
	}
});
