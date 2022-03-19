import React, { ReactNode } from 'react';

/* Styles */
import { StyledTextButton } from './styledComponents';

interface Props {
	onClick: () => void;
	children: ReactNode;
	className?: string;
}

const TextButton = (props: Props) => {
	const { children, className, onClick } = props;
	return (
		<StyledTextButton className={className} onClick={onClick}>
			{children}
		</StyledTextButton>
	);
};

export default TextButton;
