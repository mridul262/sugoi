import React from 'react';

/* Styles */
import { StyledLabel } from './styledComponents';

interface Props {
	status: 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED';
	className?: string;
}

const StatusLabel = (props: Props) => {
	const { status, className } = props;
	return (
		<StyledLabel status={status} className={className}>
			{status}
		</StyledLabel>
	);
};

export default StatusLabel;
