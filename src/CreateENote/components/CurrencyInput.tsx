import { ChangeEventHandler, FC, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";

type CurrencyInputProps = {
	label?: string;
	currency?: string;
	value?: number;
	onChange: (value: number) => void;
	limitPrecision?: boolean;
	disabled?: boolean;
	helperText?: string;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
	value,
	onChange,
	label,
	currency,
	limitPrecision = false,
	disabled,
	helperText
}) => {
	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => onChange(Number(e.target.value)), [onChange]);
	const inputProps = useMemo(() => ({
		startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
	}), [currency]);
	const displayValue = limitPrecision ? value?.toFixed(2) : value;

	return (
		<TextField
			label={label}
			value={displayValue === undefined ? "" : displayValue}
			disabled={disabled}
			variant="outlined"
			type="number"
			onChange={handleChange}
			InputProps={currency ? inputProps : undefined}
			helperText={helperText}
		/>
	);
};

export default CurrencyInput;
