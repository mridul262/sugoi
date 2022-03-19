import React, { ReactNode } from 'react';

/* Components */
import TextButton from '../TextButton';

/* Styles */
import { DropdownContent, DropdownTriggerRow } from './styledComponents';

interface Props {
	label: string;
	children: ReactNode;
	className?: string;
	action?: () => void;
	actionLabel?: string;
}

const InlineDropdown = (props: Props) => {
	const { label, children, className, actionLabel, action } = props;
	const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(true);

	return (
		<div className={className}>
			<DropdownTriggerRow showDropdown={isDropdownOpen}>
				<div>
					<i className="bx bxs-down-arrow" />
					<button onClick={() => setDropdownOpen(!isDropdownOpen)}>
						{' '}
						{label}{' '}
					</button>
				</div>
				{isDropdownOpen && action && actionLabel && (
					<TextButton onClick={() => null}> Edit </TextButton>
				)}
			</DropdownTriggerRow>
			{isDropdownOpen && (
				<div>
					<DropdownContent>{children}</DropdownContent>
					<TextButton onClick={() => setDropdownOpen(false)}>
						{' '}
						Show Less{' '}
					</TextButton>
				</div>
			)}
		</div>
	);
};

export default InlineDropdown;
