import { ChangeEventHandler, FC, useCallback } from "react";
import { TextField } from "@mui/material";

type ScalarInputProps = {
	label?: string;
	value?: number;
	onChange?: (value: number) => void;
	isReadOnly?: boolean;
}

const ScalarInput: FC<ScalarInputProps> = ({ value, onChange, label, isReadOnly }) => {
	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => onChange?.(Number(e.target.value)), [onChange]);

	return (
		<TextField
			inputMode={isReadOnly ? "none" : undefined}
			label={label}
			value={value || ""}
			variant="outlined"
			type="number"
			onChange={handleChange}
		/>
	);
};

export default ScalarInput;
