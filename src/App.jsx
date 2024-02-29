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

export const calendarProcess = {
	init: "instructions",
	pickDates: "calendar",
	peopleList: "list",
	table: "table",
}

Object.freeze(calendarProcess)

export const ParticipantsContext = createContext({
	participants: [],
	setParticipants: () => {},
})

export const SelectedDatesContext = createContext({
	selectedDates: [],
	setSelectedDates: () => {},
})

function App() {
	const [stage, setStage] = useState(calendarProcess.pickDates)
	const [selectedDates, setSelectedDates] = useState(mockSelectedDates)
	const [participants, setParticipants] = useState(mockParticipants)

	return (
		<div className="flex h-dvh flex-col sm:h-screen">
			<Header />
			<main className="bg-image h-full w-full items-center bg-cover bg-center ">
				<section className="relative h-full w-full sm:grid sm:items-center">
					{stage === calendarProcess.init && (
						<>
							<SetupContainer>
								<Instructions
									onClick={() =>
										setStage(calendarProcess.pickDates)
									}
								/>
							</SetupContainer>
							<div className="absolute bottom-0 left-0 grid  w-full items-center bg-white/70 p-4 backdrop-blur-3xl sm:hidden">
								<button
									className="rounded-md bg-gradient-to-br from-blue-700 via-violet-600 to-purple-700 px-8 py-3 font-semibold text-zinc-50"
									onClick={() =>
										setStage(calendarProcess.pickDates)
									}
								>
									Empezar
								</button>
							</div>
						</>
					)}

					{stage === calendarProcess.pickDates && (
						<>
							<SetupContainer>
								{/* <Progress stage={stage} /> */}

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
							<div className="absolute bottom-0 left-0 grid w-full items-center gap-2 bg-white p-4 sm:hidden">
								<button
									className="rounded-md bg-gradient-to-br px-8 py-3  text-red-600  disabled:opacity-30"
									onClick={() => setSelectedDates([])}
									disabled={selectedDates.length === 0}
								>
									Deseleccionar todo
								</button>
								<button
									className="rounded-md bg-stone-800 bg-gradient-to-br px-8 py-3 font-semibold text-zinc-50  disabled:opacity-30"
									onClick={() =>
										setStage(calendarProcess.peopleList)
									}
									disabled={selectedDates.length === 0}
								>
									Hecho
								</button>
							</div>
						</>
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
