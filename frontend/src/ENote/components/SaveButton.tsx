import { FC } from "react";
import Button from "@mui/material/Button";

type SaveButtonProps = {
	children: string;
	onClick?: () => void;
	type?: "submit" | "button";
	disabled?: boolean;
};

const SaveButton: FC<SaveButtonProps> = ({ children, onClick, disabled, ...rest }) => {
	return (
		<Button
			{...rest}
			disabled={disabled}
			variant="contained"
			onClick={onClick}>
			{children}
		</Button>
	);
};

export default SaveButton;
