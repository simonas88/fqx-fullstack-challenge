import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type LoadingIndicatorProps = {
	children?: string;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ children }) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
			{children} <CircularProgress />
		</Box>
	);
};

export default LoadingIndicator;
