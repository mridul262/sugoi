import { styled, css } from '@stitches/react';

export const StyledFeedbackWrapper = styled('div', {
	margin: '2.5rem 0',
	width: '100%',
	background: '$sage1',
	boxShadow: '$medium',
	borderRadius: '7px',
	maxHeight: '50rem',
	transition: 'max-height 0.7s ease-in-out',
	overflow: 'hidden',

	variants: {
		isMinimised: {
			true: {
				maxHeight: '4rem',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				padding: '$minute $tiny',
				cursor: 'pointer',
				background: '$sage2',
				margin: '$minute 0',

				'&:hover': {
					background: '$sage3'
				}
			}
		}
	},

	'&:hover': {
		background: '$sage2'
	}
});

export const StyledFeedbackHeader = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '$small $tiny $small $medium',

	'> div': {
		display: 'flex',
		alignItems: 'center',

		h3: {
			color: '$sage11',
			fontSize: '$content10',
			lineHeight: '1px'
		}
	},

	variants: {
		isMinimised: {
			true: {
				padding: '0',
				paddingLeft: '$small',
				h3: {
					display: 'none'
				}
			}
		}
	}
});

export const RedCircle = styled('div', {
	width: '5px',
	height: '5px',
	borderRadius: '50%',
	marginRight: '$tiny',

	variants: {
		status: {
			CREATED: {
				background: '$systemRed'
			},
			ANSWERED: {
				backgroundColor: '$systemOrange'
			},
			RESOLVED: {
				backgroundColor: '$systemGreen'
			}
		}
	}
});

export const StyledFeedback = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	padding: '0 $medium',
	maxHeight: '40rem',
	overflow: 'auto',

	h3: {
		color: '$sage12',
		fontWeight: '$medium',
		marginBottom: '$small'
	},

	p: {
		color: '$sage11',
		lineHeight: '20px',
		fontWeight: '$medium'
	},

	variants: {
		isMinimised: {
			true: {
				padding: '0',
				h3: {
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					fontSize: '$content14',
					fontWeight: '$regular',
					margin: '0'
				},
				p: {
					display: 'none'
				}
			}
		}
	}
});

export const StyledActions = styled('div', {
	width: '100%',
	height: 'max-content',
	display: 'flex',
	justifyContent: 'flex-end',
	paddingRight: '$tiny',
	paddingBottom: '$tiny',
	marginTop: '3rem',

	variants: {
		isMinimised: {
			true: {
				margin: '0',
				padding: '0',
				marginLeft: 'auto',
				width: 'max-content'
			}
		}
	}
});

export const InputCss = css({
	input: {
		width: '100% !important',
		height: '3rem !important'
	},
	width: '100%',
	marginBottom: '18px'
});

export const InputSmallCss = css({
	textarea: {
		width: '100% !important',
		height: '3rem !important',
		fontSize: '$content14 !important',
		color: '$sage11 !important'
	},
	width: '100%',
	marginBottom: '18px'
});
