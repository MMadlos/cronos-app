import "./App.css"

import Calendar from "./components/Calendar/Calendar"
import UserList from "./components/UserList/UserList"

function App() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-indigo-100">
			{/* <Calendar /> */}
			<UserList />
		</main>
	)
}

export default App
