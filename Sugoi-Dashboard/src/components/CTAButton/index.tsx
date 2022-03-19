import React from 'react';
import { Link } from 'react-router-dom';

/* Styles */
import { Button } from './styledComponents';

interface Props {
	colorScheme: 'brand' | 'creator';
	type: 'primary' | 'secondary' | 'solid';
	size: 'tiny' | 'small' | 'medium' | 'big';
	disabled?: boolean;
	children: React.ReactNode;
	onClick?: () => any;
	to?: string;
	className?: string;
}

const CTAButton = (props: Props) => {
	const { colorScheme, type, size, children, onClick, to, disabled, className } = props;

	if (to) {
		return (
			<Button color={`${colorScheme}${type}`} disabled={disabled} size={size} className={className}>
				<Link style={{ textDecoration: 'none' }} to={to}>
					{children}
				</Link>
			</Button>
		);
	} else {
		return (
			<Button color={`${colorScheme}${type}`} size={size} onClick={onClick} className={className}>
				{children}
			</Button>
		);
	}
};

export default CTAButton;
