import { FC, useCallback } from "react";
import enLocale from "date-fns/locale/en-GB";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePickerMui from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField/TextField";

type DatePickerProps = {
	label: string;
	value?: Date;
	onChange: (date: Date) => void;
	minDate?: Date;
	maxDate?: Date;
}

const DatePicker: FC<DatePickerProps> = (props) => {
	const { onChange } = props;
	const handleChange = useCallback((e: Date | null) => onChange(e || new Date()), [onChange]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
			<DatePickerMui
				{...props}
				value={props.value ?? null}
				onChange={handleChange}
				renderInput={(props) => <TextField {...props} />} />
		</LocalizationProvider>
	);
};

export default DatePicker;
