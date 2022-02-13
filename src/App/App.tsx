import { FC } from "react";
import CreateENote from "../CreateENote/CreateENote";
import "./App.css";

const App: FC = () => (
	<div className="App" data-testid="app-root">
		<CreateENote />
	</div>
);

export default App;
