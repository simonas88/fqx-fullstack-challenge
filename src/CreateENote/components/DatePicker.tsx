import { FC, useCallback } from "react";
import chLocale from "date-fns/locale/fr-CH";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePickerMui from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField/TextField";

type DatePickerProps = {
	label: string;
	value: Date;
	onChange: (date: Date) => void;
}

const DatePicker: FC<DatePickerProps> = (props) => {
	const { onChange } = props;
	const handleChange = useCallback((e: Date | null) => onChange(e || new Date()), [onChange]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={chLocale}>
			<DatePickerMui
				{...props}
				onChange={handleChange}
				renderInput={(props) => <TextField {...props} />} />
		</LocalizationProvider>
	);
};

export default DatePicker;
