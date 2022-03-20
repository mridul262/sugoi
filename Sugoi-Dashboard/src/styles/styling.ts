import { createStitches, styled } from '@stitches/react';
import { sage, yellow, teal } from '@radix-ui/colors';

export const { theme } = createStitches({
	theme: {
		colors: {
			...yellow,
			...teal,
			...sage,

			/* Systems colors */
			accentBlue: '#349af8',
			accentOrange: '#fc7900',
			systemOrange: '#f4aa74',
			systemRed: '#eb675e',
			systemGreen: '#5dc560',
			systemBlue: '#5381db',
			systemCream: '#fff2ee'
		},
		space: {
			minute: '5px',
			tiny: '10px',
			small: '18px',
			medium: '30px',
			big: '40px',
			large: '60px'
		},
		fontSizes: {
			title54: '54px',
			title46: '46px',

			subtitle40: '40px',
			subtitle38: '38px',
			subtitle32: '32px',
			subtitle28: '28px',
			subtitle24: '24px',
			subtitle20: '20px',

			content18: '18px',
			content16: '16px',
			content14: '14px',
			content12: '12px',
			content10: '10px'
		},
		fonts: {
			poppins: 'Poppins, sans-serif',
			openSans: 'Open Sans, sans-serif'
		},

		fontWeights: {
			light: '200',
			regular: '300',
			medium: '400',
			semibold: '500',
			bold: '600',
			extrabold: '700'
		},

		lineHeights: {
			lineheight45: '45px',
			lineheight30: '30px',
			lineheight20: '20px'
		},
		letterSpacings: {},
		sizes: {
			minHeight: '100vh'
		},
		borderWidths: {},
		borderStyles: {},
		radii: {},
		shadows: {
			small: '0 0 4px rgba(0, 0, 0, .125)',
			medium: '0 0 12px rgba(0, 0, 0, .125)',
			large: '0 0 24px rgba(0, 0, 0, .125)'
		},
		zIndices: {},
		transitions: {
			default: 'all .2s ease-in-out',
			fast: 'all .1s ease-in-out',
			slow: 'all .4s ease-in-out'
		}
	}
});

export const Layout = styled('main', {
	background: '$sage1',
	maxWidth: '170rem',
	minHeight: '100%',
	margin: '0 auto',
	padding: '6rem 4rem',
	paddingBottom: '10rem',

	// Media queries
	'@media (max-width: 768px)': {
		width: '90%'
	},

	variants: {
		hideNavBar: {
			true: {
				paddingTop: '0'
			},
			false: {
				paddingTop: '9rem'
			}
		}
	}
});

//   const darkTheme = theme({
//     colors: {
//       ...grayDark,
//       ...blueDark,
//       ...redDark,
//       ...greenDark,
//     },
//   });
