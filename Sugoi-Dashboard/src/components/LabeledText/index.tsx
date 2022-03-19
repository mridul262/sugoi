import React, { ReactChild } from 'react';

/* Styles */
import { StyledLabeledText } from './styledComponents';

interface Props {
	label: string;
	children: ReactChild;
	className?: string;
}

const LabeledText = (props: Props) => {
	const { label, children, className } = props;
	return (
		<StyledLabeledText className={className}>
			<p> {label} </p>
			{children}
		</StyledLabeledText>
	);
};

export default LabeledText;
