import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'rsuite';

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
	loading?: boolean;
}

const CTAButton = (props: Props) => {
	const { colorScheme, loading, type, size, children, onClick, to, disabled, className } = props;

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
				{loading && <><Loader/>&nbsp;&nbsp;&nbsp;</>}
				{children}
			</Button>
		);
	}
};

export default CTAButton;
