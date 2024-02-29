import "./App.css"
import { useState, createContext } from "react"
import { mockSelectedDates, mockParticipants } from "./mockData"

import SetupContainer from "./components/InitialSetup/SetupContainer"
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
		<div className="flex h-dvh flex-col sm:h-screen">
			<Header />
			<main className="bg-image flex h-full w-full flex-col items-center bg-cover bg-center ">
				<section>
					{stage === calendarProcess.init && (
						<SetupContainer>
							<Instructions
								onClick={() =>
									setStage(calendarProcess.pickDates)
								}
							/>
						</SetupContainer>
					)}

					{stage === calendarProcess.pickDates && (
						<SetupContainer>
							<Progress stage={stage} />

							<SelectedDatesContext.Provider
								value={{
									selectedDates,
									setSelectedDates,
								}}
							>
								<DatePicker
									onClick={() =>
										setStage(calendarProcess.peopleList)
									}
								/>
							</SelectedDatesContext.Provider>
						</SetupContainer>
					)}

					{stage === calendarProcess.peopleList && (
						<SetupContainer>
							<Progress stage={stage} />

							<ParticipantsContext.Provider
								value={{
									participants,
									setParticipants,
								}}
							>
								<UserList
									onClickReturn={() =>
										setStage(calendarProcess.pickDates)
									}
									onClickNext={() =>
										setStage(calendarProcess.table)
									}
								/>
							</ParticipantsContext.Provider>
						</SetupContainer>
					)}

					{stage === calendarProcess.table && (
						<ParticipantsContext.Provider
							value={{ participants, setParticipants }}
						>
							<SelectedDatesContext.Provider
								value={{ selectedDates, setSelectedDates }}
							>
								<Table />
							</SelectedDatesContext.Provider>
						</ParticipantsContext.Provider>
					)}
				</section>
			</main>
		</div>
	)
}

export default App
