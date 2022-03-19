import React from 'react';

/* Styles */
import { StyledIconButton } from './styledComponents';

interface Props {
	iconName: string;
	hasBackground?: boolean;
	changeColorOnHover?: boolean;
	className?: string;
	onClick?: () => void;
}

const Icon = (props: Props) => {
	const { iconName, className, onClick, hasBackground, changeColorOnHover } =
		props;
	return (
		<StyledIconButton
			className={className}
			onClick={onClick}
			hasBackground={hasBackground}
			changeColorOnHover={changeColorOnHover}
		>
			<i className={`${iconName}`} />
		</StyledIconButton>
	);
};

export default Icon;
