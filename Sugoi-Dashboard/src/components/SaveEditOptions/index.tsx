import React from 'react';

/* Components */
import Icon from '../Icon';

/* Styles */
import { StyledEditButtons } from './styledComponents';

interface Props {
	className?: string;
	handleSave: () => void;
	handleCancel: () => void;
}

const SaveEditOptions = (props: Props) => {
	const { className, handleSave, handleCancel } = props;
	return (
		<StyledEditButtons className={className}>
			<Icon
				iconName="icofont icofont-check"
				hasBackground
				onClick={handleSave}
			/>
			<Icon
				iconName="icofont icofont-close"
				hasBackground
				onClick={handleCancel}
			/>
		</StyledEditButtons>
	);
};

export default SaveEditOptions;
