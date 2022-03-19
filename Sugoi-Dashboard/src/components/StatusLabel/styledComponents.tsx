import { styled } from '@stitches/react';

export const StyledLabel = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '4px',
	fontSize: '8px',
	color: '$sage1',
	width: 'max-content',
	height: '18px',
	padding: '2px 12px',
	fontWeight: 'bold',

	variants: {
		status: {
			ACTIVE: {
				background: '$systemGreen'
			},
			IN_PROGRESS: {
				background: '$systemOrange'
			},
			COMPLETED: {
				background: '$sage9'
			}
		}
	}
});
