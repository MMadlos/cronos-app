import "./App.css"

import Calendar from "./components/Calendar/Calendar"
import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"

function App() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-indigo-100">
			{/* <Calendar /> */}
			{/* <UserList /> */}
			<Table />
		</main>
	)
}

export default App
