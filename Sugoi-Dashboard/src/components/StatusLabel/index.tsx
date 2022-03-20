import React from 'react';

/* Styles */
import { StyledLabel } from './styledComponents';

interface Props {
	status: 'Active' | 'Closed' | 'Refund';
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
