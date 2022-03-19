import React from 'react';

import TextButton from '../TextButton';

/* Styles */
import { StyledSectionHeader } from './styledComponents';

interface Props {
	label: string;
	actionLabel?: string;
	action?: () => void;
	handleToggleContent?: () => void;
	isDropdown?: boolean;
}

const SectionHeader = (props: Props) => {
	const { label, actionLabel, action, isDropdown, handleToggleContent } = props;
	return (
		<StyledSectionHeader>
			<button onClick={handleToggleContent}>
				{isDropdown && <i className="bx bxs-down-arrow small" />}
				{label}
			</button>
			{actionLabel && action && (
				<TextButton onClick={action}>{actionLabel}</TextButton>
			)}
		</StyledSectionHeader>
	);
};

export default SectionHeader;
