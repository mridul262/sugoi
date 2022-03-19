import { css } from '@stitches/react';

export const ActiveCampaignTabCss = css({
	color: '$teal12 !important',
	fontWeight: '500 !important',
	marginBottom: '-2px',
	borderBottom: '2px solid $teal9 !important'
});

export const TabListCss = css({
	display: 'flex',
	listStyle: 'none',
	margin: '0 !important',
	borderBottom: '2px solid #e6e6e6',

	li: {
		paddingBottom: '6px',
		color: '$teal12 !important',
		fontSize: '$fontsize_content_14 !important',
		fontFamily: 'Poppins, sans-serif',
		marginRight: '30px',
		cursor: 'pointer !important'
	}
});
