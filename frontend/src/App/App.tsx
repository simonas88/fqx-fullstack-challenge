import { FC } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../api/queryClient";
import ENoteForm from "../ENote/ENoteForm/ENoteForm";
import "./App.css";

const App: FC = () => (
	<QueryClientProvider client={queryClient}>
		<div className="App" data-testid="app-root">
			<ENoteForm title="Create eNote" onSave={v => console.log(v)} />
		</div>
	</QueryClientProvider>
);

export default App;
