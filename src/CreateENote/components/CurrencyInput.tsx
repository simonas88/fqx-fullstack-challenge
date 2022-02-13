import { ChangeEventHandler, FC, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";

type CurrencyInputProps = {
	label?: string;
	currency?: string;
	value: number;
	onChange: (value: number) => void;
}

const CurrencyInput: FC<CurrencyInputProps> = ({ value, onChange, label, currency }) => {
	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => onChange(Number(e.target.value)), [onChange]);
	const inputProps = useMemo(() => ({
		startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
	}), [currency]);

	return (
		<TextField
			label={label}
			value={value}
			variant="outlined"
			type="number"
			onChange={handleChange}
			InputProps={currency ? inputProps : undefined}
		/>
	);
};

export default CurrencyInput;
