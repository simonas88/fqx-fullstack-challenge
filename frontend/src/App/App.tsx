import { FC } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../api/queryClient";
import CreateENote from "../ENote/CreateENote";
import "./App.css";

const App: FC = () => (
	<QueryClientProvider client={queryClient}>
		<div className="App" data-testid="app-root">
			<CreateENote />
		</div>
	</QueryClientProvider>
);

export default App;
