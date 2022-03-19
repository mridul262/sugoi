import { styled } from '@stitches/react';

export const StyledTextButton = styled('div', {
	color: '$teal11',
	fontSize: '$content14',
	fontWeight: '$semibold',
	cursor: 'pointer',

	'&:hover': {
		color: '$teal12'
	}
});
