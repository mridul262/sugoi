import { styled } from '@stitches/react';

export const StyledLabeledText = styled('div', {
	width: 'max-content',
	color: '$sage12',
	display: 'flex',
	flexDirection: 'column',
	fontWeight: '$bold',

	p: {
		color: '$sage11',
		lineHeight: '20px',
		fontWeight: '$medium'
	}
});
