import "./App.css"

import { calendar } from "./utils"

import CalendarHeader from "./components/CalendarHeader"
import CalendarBody from "./components/CalendarBody"

function App() {
	return (
		<>
			<main className="bg-indigo-100 h-full flex flex-col justify-center items-center">
				<div className="my-8 flex flex-col gap-4">
					{calendar.map((month, index) => {
						const { monthName, daysOfMonth, startsOn } = month
						return (
							<div
								id="calendar"
								key={index}
								className="w-[800px]  bg-indigo-50 p-8 flex flex-col gap-6 rounded-xl">
								<CalendarHeader month={monthName} />
								<CalendarBody
									daysOfMonth={daysOfMonth}
									startsOn={startsOn}
								/>
							</div>
						)
					})}
				</div>
			</main>
		</>
	)
}

export default App
