import "./App.css"
import { useState, createContext, useEffect } from "react"
import { mockSelectedDates, mockParticipants } from "./mockData"

import Nav from "./components/Nav/Nav"
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

// TODO - Add buttons behaviours in stage 0. When no dates are selected -> Reset not available and done not active.

export const ParticipantsContext = createContext({
	participants: [],
	setParticipants: () => {},
})

export const SelectedDatesContext = createContext({
	selectedDates: [],
	setSelectedDates: () => {},
})

function App() {
	const [stage, setStage] = useState(calendarProcess.peopleList)

	const [selectedDates, setSelectedDates] = useState(mockSelectedDates)
	const [participants, setParticipants] = useState([...mockParticipants])

	// const [summaryData, setSummaryData] = useState([])

	// function mapSummaryData() {
	// 	const newSummaryData = []

	// 	selectedDates.forEach((dateTime) => {
	// 		const monthName = getIntlMonthLong(dateTime)
	// 		const isMonthIncluded = newSummaryData.some(
	// 			(monthData) => monthData.monthName === monthName
	// 		)

	// 		if (!isMonthIncluded) {
	// 			const monthIndex = dateTime.getMonth()
	// 			const selectedDates = []
	// 			const monthData = { monthName, monthIndex, selectedDates }

	// 			newSummaryData.push(monthData)
	// 		}

	// 		const date = dateTime.getDate()
	// 		const confirmedList = []
	// 		const ratio = 0
	// 		const dateData = { date, confirmedList, ratio }

	// 		const [monthData] = newSummaryData.filter(
	// 			(month) => month.monthName === monthName
	// 		)
	// 		monthData.selectedDates.push(dateData)
	// 	})
	// 	return newSummaryData
	// }

	// useEffect(() => {
	// 	const participantsCount = participants.length
	// 	const newSummaryData = mapSummaryData()
	// 	confirmedData.forEach((data) => {
	// 		const { dateTime, participant } = data
	// 		const dateTimeObj = new Date(dateTime)
	// 		const monthName = getIntlMonthLong(dateTimeObj)

	// 		const [monthData] = newSummaryData.filter(
	// 			(monthData) => monthData.monthName === monthName
	// 		)

	// 		const currentDate = dateTimeObj.getDate()
	// 		const [dateData] = monthData.selectedDates.filter(
	// 			(dateData) => dateData.date === currentDate
	// 		)

	// 		dateData.confirmedList.push(participant)
	// 		dateData.ratio = dateData.confirmedList.length / participantsCount
	// 	})

	// 	setSummaryData(newSummaryData)
	// }, [confirmedData])

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
							<div className="mt-10 h-full w-full">
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
					<section className="container mx-auto mt-10 flex max-h-full w-fit max-w-[90%] flex-col gap-2">
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
