import "./App.css"
import { useState, createContext } from "react"
import { mockSelectedDates, mockParticipants } from "./mockData"

import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"
import Header from "./components/Header/Header"
import Instructions from "./components/InitialSetup/Instructions"
import DatePicker from "./components/DatePicker/DatePicker"
import Progress from "./components/InitialSetup/Progress"

const calendarProcess = {
	init: "instructions",
	pickDates: "calendar",
	peopleList: "list",
	table: "table",
}

export const ParticipantsContext = createContext({
	participants: [],
	setParticipants: () => {},
})

export const SelectedDatesContext = createContext({
	selectedDates: [],
	setSelectedDates: () => {},
})

function App() {
	const [stage, setStage] = useState(calendarProcess.init)
	const [selectedDates, setSelectedDates] = useState(mockSelectedDates)
	const [participants, setParticipants] = useState(mockParticipants)

	return (
		<div className="mw-screen flex min-h-dvh flex-row sm:h-screen">
			<main className="flex min-h-full w-full flex-col items-center">
				<Header />
				{stage !== calendarProcess.table && (
					<section className="flex h-full w-full items-center justify-center">
						<div className="flex h-full w-full flex-col bg-zinc-100 p-4 sm:h-[90%] sm:w-[70%] sm:items-center sm:rounded-lg sm:p-6">
							{stage !== calendarProcess.init && (
								<Progress stage={stage} />
							)}
							<div className=" mt-2 flex h-full w-full justify-center sm:mt-0 sm:h-full sm:items-center">
								{stage === calendarProcess.init && (
									<Instructions
										onClickAddCalendar={() =>
											setStage(calendarProcess.pickDates)
										}
									/>
								)}
								{stage === calendarProcess.pickDates && (
									<SelectedDatesContext.Provider
										value={{
											selectedDates,
											setSelectedDates,
										}}
									>
										<DatePicker
											onClick={() =>
												setStage(
													calendarProcess.peopleList
												)
											}
										/>
									</SelectedDatesContext.Provider>
								)}
								{stage === calendarProcess.peopleList && (
									<ParticipantsContext.Provider
										value={{
											participants,
											setParticipants,
										}}
									>
										<UserList
											onClickReturn={() =>
												setStage(
													calendarProcess.pickDates
												)
											}
											onClickNext={() =>
												setStage(calendarProcess.table)
											}
										/>
									</ParticipantsContext.Provider>
								)}
							</div>
						</div>
					</section>
				)}

				{stage === calendarProcess.table && (
					<section className="container mx-auto flex h-full flex-col gap-2 sm:w-[80vw] ">
						<ParticipantsContext.Provider
							value={{ participants, setParticipants }}
						>
							<SelectedDatesContext.Provider
								value={{ selectedDates, setSelectedDates }}
							>
								<Table />
							</SelectedDatesContext.Provider>
						</ParticipantsContext.Provider>
					</section>
				)}
			</main>
		</div>
	)
}

export default App
