import React from 'react';

/* Components */
import Icon from '../Icon';
import Input from '../InputForm';
import SaveEditOptions from '../SaveEditOptions';

/* Types */
import { CreatorFeedback } from '../../interfaces/CreatorTable';

/* Styles */
import {
	RedCircle,
	StyledFeedbackWrapper,
	StyledFeedbackHeader,
	StyledFeedback,
	StyledActions,
	InputCss,
	InputSmallCss
} from './styledComponents';

interface Props {
	feedback: CreatorFeedback;
	onFeedbackClick?: () => void;
	isMinimised?: boolean;
	className?: string;
}

const Feedback = (props: Props) => {
	const { feedback, className, onFeedbackClick, isMinimised } = props;
	const [isEdittingFeedback, setEdittingFeedback] =
		React.useState<boolean>(false);
	const [updatedFeedback, setUpdatedFeedback] =
		React.useState<CreatorFeedback>(feedback);

	React.useEffect(() => {
		if (isMinimised) {
			setEdittingFeedback(false);
		}
	}, [isMinimised]);

	const handleEditFeedback = () => {
		setEdittingFeedback(!isEdittingFeedback);
		if (onFeedbackClick) {
			onFeedbackClick();
		}
	};

	const handleEditCancel = () => {
		setEdittingFeedback(false);
		setUpdatedFeedback(feedback);
	};

	const handleEditSave = () => {
		setEdittingFeedback(false);
	};

	return (
		<StyledFeedbackWrapper isMinimised={isMinimised} onClick={onFeedbackClick}>
			<StyledFeedbackHeader isMinimised={isMinimised}>
				<div>
					<RedCircle status={feedback.status} />
					<h3> {feedback.status} </h3>
				</div>
				{isEdittingFeedback ? (
					<SaveEditOptions
						handleCancel={handleEditCancel}
						handleSave={handleEditSave}
					/>
				) : (
					<div />
				)}
			</StyledFeedbackHeader>
			<StyledFeedback className={className} isMinimised={isMinimised}>
				{!isEdittingFeedback ? (
					<h3>{feedback.title}</h3>
				) : (
					<Input
						className={InputCss()}
						type="text"
						value={updatedFeedback.title}
						name="title"
						id="title"
						onChange={(e: any) => {
							setUpdatedFeedback({
								...updatedFeedback,
								title: e.target.value
							});
						}}
					/>
				)}

				{!isEdittingFeedback ? (
					<p>{updatedFeedback.desc}</p>
				) : (
					<Input
						className={InputSmallCss()}
						type="text"
						textbox
						value={updatedFeedback.desc}
						name="title"
						id="title"
						onChange={(e: any) => {
							setUpdatedFeedback({
								...updatedFeedback,
								desc: e.target.value
							});
						}}
					/>
				)}
			</StyledFeedback>
			<StyledActions isMinimised={isMinimised}>
				{!isEdittingFeedback && (
					<Icon iconName="bx bx-pencil" onClick={handleEditFeedback} />
				)}
				<Icon iconName="bx bx-trash" />
			</StyledActions>
		</StyledFeedbackWrapper>
	);
};

export default Feedback;
