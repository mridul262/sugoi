import React, { memo } from 'react';
import { Input } from './styledComponents';

interface Props {
	label?: string;
	id: string;
	className?: string;
	hasError?: boolean;
	errorMessage?: string;
	type: 'text' | 'email' | 'password' | 'checkbox';
	name: string;
	size?: 'small' | 'medium' | 'large';
	autoComplete?: 'on' | 'off';
	placeholder?: string;
	value: string;
	textbox?: boolean;
	required?: boolean;
	onChange: (e: any) => void;
	checked?: boolean;
}

const FormInput: React.FC<Props> = (props) => {
	const {
		label,
		hasError,
		errorMessage,
		id,
		textbox,
		className,
		size = 'large',
		...otherProps
	} = props;

	return (
		<Input size={size} className={className}>
			<div>{label}</div>
			{!textbox ? (
				<input id={id} {...otherProps} />
			) : (
				<textarea id={id} {...otherProps} />
			)}
			{hasError && <small>{errorMessage}</small>}
		</Input>
	);
};

export default memo(FormInput);
