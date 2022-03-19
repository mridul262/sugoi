import { styled } from '@stitches/react';

export const Button = styled('button', {
	border: 'none',
	borderRadius: '7px',
	cursor: 'pointer',
	outline: 'none',
	transition: 'all 0.2s ease-in-out',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textDecoration: 'none',

	i: {
		marginRight: '5px'
	},
	variants: {
		disabled: {
			true: {
				pointerEvents: 'none',
				opacity: 0.5
			}
		},
		color: {
			brandprimary: {
				backgroundColor: '$teal4',
				color: '$teal11',

				'&:hover': {
					backgroundColor: '$teal5'
				},

				'&:active': {
					backgroundColor: '$teal6'
				}
			},
			brandsecondary: {
				backgroundColor: '$teal1',
				color: '$teal11',
				border: '1px solid $teal7',

				'&:hover': {
					backgroundColor: '$teal2',
					border: '1px solid $teal8'
				},

				'&:focus': {
					backgroundColor: '$teal3',
					border: '1px solid $teal9'
				}
			},

			brandsolid: {
				backgroundColor: '$teal9',
				color: '$sage1',
				border: '1px solid $teal9',

				'&:hover': {
					backgroundColor: '$teal10',
					border: '1px solid $teal10'
				},

				'&:focus': {
					backgroundColor: '$teal10',
					border: '1px solid $teal10'
				}
			},

			creatorprimary: {
				backgroundColor: '$yellow4',
				color: '$yellow11',

				'&:hover': {
					backgroundColor: '$yellow5'
				},

				'&:active': {
					backgroundColor: '$yellow6'
				}
			},

			creatorsecondary: {
				backgroundColor: '$yellow1',
				color: '$yellow12',
				border: '1px solid $yellow7',

				'&:hover': {
					backgroundColor: '$yellow2',
					border: '1px solid $yellow8'
				},

				'&:focus': {
					backgroundColor: '$yellow3',
					border: '1px solid $yellow9'
				}
			},

			creatorsolid: {
				backgroundColor: '$teal9',
				color: '$sage1',
				border: '1px solid $teal9',

				'&:hover': {
					backgroundColor: '$teal10',
					border: '1px solid $teal10'
				},

				'&:focus': {
					backgroundColor: '$teal10',
					border: '1px solid $teal10'
				}
			}
		},

		size: {
			tiny: {
				fontSize: '$content12',
				padding: '5px 18px',
				fontWeight: '$medium',
				minWidth: '10rem',
				maxWidth: '20rem'
			},
			small: {
				fontSize: '$content14',
				padding: '8px 20px',
				fontWeight: '$medium',
				minWidth: '10rem',
				maxWidth: '20rem'
			},
			medium: {
				fontSize: '$content16',
				padding: '10px 25px',
				fontWeight: '$semibold',
				minWidth: '20rem',
				maxWidth: '30rem'
			},
			big: {
				fontSize: '$content18',
				padding: '12px 30px',
				fontWeight: '$bold',
				minWidth: '20rem',
				maxWidth: '40rem'
			}
		}
	}
});
