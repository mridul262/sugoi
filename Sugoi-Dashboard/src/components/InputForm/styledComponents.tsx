import { styled } from '@stitches/react';

export const Input = styled('div', {
	objectFit: 'contain',
	div: {
		fontWeight: '600',
	},
	input: {
		marginBottom: '18px',
		background: 'none',
		border: 'none',
		borderBottom: '2px solid $sage6',
		padding: '1rem',
		// fontSize: '$content18',
		color: '$teal12 !important',
		'&:focus': {
			outline: 'none',
			border: '1px solid $sage8',
			borderRadius: '7px'
		},
		'::placeholder': {
			color: '$sage9'
		}
	},

	textarea: {
		background: 'none',
		border: '1px solid $teal6',
		padding: '1rem',
		borderRadius: '7px',
		fontSize: '$content18',
		minHeight: '12rem !important',
		maxWidth: '60rem',
		color: '$teal12 !important',

		'&:focus': {
			outline: 'none',
			border: '1px solid $teal8'
		},

		'::placeholder': {
			color: '$teal9 !important'
		},

		'::-webkit-input-placeholder': {
			color: '$teal9 !important'
		}
	},

	variants: {
		size: {
			small: {
				input: {
					width: '20rem',
					height: '4rem',
					fontSize: '$content14',
				}
			},
			medium: {
				input: {
					width: '30rem',
					height: '4rem',
					fontSize: '$content14',
				}
			},
			large: {
				input: {
					width: '50rem',
					height: '4rem',
					fontSize: '$content18',
				}
			}
		}
	}
});
