import { FC } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "../api/queryClient";
import CreateENote from "../ENote/CreateENote";
import EditENote from "../ENote/EditENote";
import "./App.css";

const App: FC = () => (
	<QueryClientProvider client={queryClient}>
		<div className="App" data-testid="app-root">
			<BrowserRouter>
				<Routes>
					<Route index element={<CreateENote />} />
					<Route path=":id" element={<EditENote />} />
				</Routes>
			</BrowserRouter>
		</div>
	</QueryClientProvider>
);

export default App;
