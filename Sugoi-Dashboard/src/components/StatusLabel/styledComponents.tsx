import { styled } from '@stitches/react';

export const StyledLabel = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '4px',
	fontSize: '8px',
	color: '$sage1',
	marginLeft: '2.5rem',
	width: 'max-content',
	height: '18px',
	padding: '2px 12px',
	fontWeight: 'bold',

	variants: {
		status: {
			Active: {
				background: '$systemGreen'
			},
			Closed: {
				background: '$systemOrange'
			},
			Refund: {
				background: '$sage9'
			}
		}
	}
});
