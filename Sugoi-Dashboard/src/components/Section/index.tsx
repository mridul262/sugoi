import React, { ReactNode } from 'react';

/* Components */
import SectionHeader from '../SectionHeader';

/* Styles */
import { StyledSection } from './styledComponents';

interface Props {
	label: string;
	children: ReactNode;
	className?: string;
	actionLabel?: string;
	action?: () => void;

	/* Turns the section into a dropdown hidable section */
	isDropdown?: boolean;
}

const Section = (props: Props) => {
	const { label, children, className, actionLabel, action, isDropdown } = props;
	const [isContentShow, setContentShown] = React.useState(true);

	const handleToggleContent = () => {
		if (isDropdown) {
			setContentShown(!isContentShow);
		}
	};

	return (
		<StyledSection className={className}>
			<SectionHeader
				label={label}
				actionLabel={actionLabel}
				action={action}
				handleToggleContent={handleToggleContent}
				isDropdown={isDropdown}
			/>
			{isContentShow && children}
		</StyledSection>
	);
};

export default Section;
