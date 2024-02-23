import "./App.css"
import { useState, createContext } from "react"
import { mockSelectedDates, mockParticipants } from "./mockData"

import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"
import Header from "./components/Header/Header"
import Instructions from "./components/InitialSetup/Instructions"
import DatePicker from "./components/Calendar/DatePicker"
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
	const [selectedDates, setSelectedDates] = useState([])
	const [participants, setParticipants] = useState([])

	return (
		<div className="flex h-screen w-screen flex-row">
			{/* <Nav summaryData={summaryData} /> */}
			<main className="flex h-full w-full flex-col items-center">
				<Header />
				{stage !== calendarProcess.table && (
					<section className="flex h-full w-full items-center justify-center">
						<div className="flex h-[90%] w-[70%]  flex-col items-center  rounded-lg bg-zinc-100 p-6">
							{stage !== calendarProcess.init && (
								<Progress stage={stage} />
							)}
							<div className=" flex h-full w-full items-center justify-center">
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
					<section className="container mx-auto mt-10 flex max-h-full w-[80vw] flex-col gap-2">
						<h2 className="text-lg font-semibold text-zinc-600">
							Fechas propuestas
						</h2>
						<div className="h-[1px] w-full bg-zinc-200"></div>

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
