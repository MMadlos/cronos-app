import "./App.css"
import { useState, createContext, useEffect } from "react"
import { getIntlMonthLong } from "./utils"
import {
	mockSelectedDates,
	mockParticipants,
	mockConfirmedData,
} from "./mockData"

import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"
import Header from "./components/Header/Header"
import EventInfo from "./components/EventInfo/EventInfo"
import Instructions from "./components/CalendarProcess/Instructions"
import CalendarProcess from "./components/CalendarProcess/CalendarProcess"
import SummaryCalendar from "./components/SummaryCalendar/SummaryCalendar"
import DatePicker from "./components/Calendar/DatePicker"

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

export const ConfirmedDataContext = createContext({
	confirmedData: {},
	setConfirmedData: () => {},
})

export const CalendarDataContext = createContext({
	calendarData: {},
	setCalendarData: () => {},
})

export const SelectedDatesContext = createContext({
	selectedDates: [],
	setSelectedDates: () => {},
})

function App() {
	const [stage, setStage] = useState(calendarProcess.table)

	const [participants, setParticipants] = useState(mockParticipants)
	const [confirmedData, setConfirmedData] = useState(mockConfirmedData)

	const [selectedDates, setSelectedDates] = useState(mockSelectedDates) //Formato time()

	const [summaryData, setSummaryData] = useState([])

	function mapSummaryData() {
		const newSummaryData = []

		selectedDates.forEach((dateTime) => {
			const monthName = getIntlMonthLong(dateTime)
			const isMonthIncluded = newSummaryData.some(
				(monthData) => monthData.monthName === monthName
			)

			if (!isMonthIncluded) {
				const monthIndex = dateTime.getMonth()
				const selectedDates = []
				const monthData = { monthName, monthIndex, selectedDates }

				newSummaryData.push(monthData)
			}

			const date = dateTime.getDate()
			const confirmedList = []
			const ratio = 0
			const dateData = { date, confirmedList, ratio }

			const [monthData] = newSummaryData.filter(
				(month) => month.monthName === monthName
			)
			monthData.selectedDates.push(dateData)
		})
		return newSummaryData
	}

	useEffect(() => {
		const participantsCount = participants.length
		const newSummaryData = mapSummaryData()
		confirmedData.forEach((data) => {
			const { dateTime, participant } = data
			const dateTimeObj = new Date(dateTime)
			const monthName = getIntlMonthLong(dateTimeObj)

			const [monthData] = newSummaryData.filter(
				(monthData) => monthData.monthName === monthName
			)

			const currentDate = dateTimeObj.getDate()
			const [dateData] = monthData.selectedDates.filter(
				(dateData) => dateData.date === currentDate
			)

			dateData.confirmedList.push(participant)
			dateData.ratio = dateData.confirmedList.length / participantsCount
		})

		setSummaryData(newSummaryData)
	}, [confirmedData])

	return (
		<div className="flex h-screen w-screen flex-row">
			<div
				className=" border-r-2 border-zinc-200 bg-zinc-50 p-2"
				id="aside-nav"
			>
				<div className="flex flex-row items-center justify-between">
					<h2 className="my-2 text-zinc-400">Summary</h2>
					<i className="fa-solid fa-circle-chevron-left text-xl text-zinc-500 hover:text-zinc-600" />
				</div>
				<SummaryCalendar summaryData={summaryData} />
			</div>
			<main className="w-full">
				<Header />
				<CalendarProcess>
					<Instructions
						onClickAddCalendar={() =>
							setStage(calendarProcess.pickDates)
						}
					/>
				</CalendarProcess>

				<SelectedDatesContext.Provider
					value={{ selectedDates, setSelectedDates }}
				>
					<CalendarProcess>
						<DatePicker />
					</CalendarProcess>
				</SelectedDatesContext.Provider>

				<ParticipantsContext.Provider
					value={{ participants, setParticipants }}
				>
					<CalendarProcess>
						<UserList />
					</CalendarProcess>
				</ParticipantsContext.Provider>

				<div className="container mx-auto mt-10 flex max-h-full w-fit max-w-[90%] flex-col gap-2">
					<h2 className="text-lg font-semibold text-zinc-600">
						Fechas propuestas
					</h2>
					<div className="h-[1px] w-full bg-zinc-200"></div>

					<ParticipantsContext.Provider
						value={{ participants, setParticipants }}
					>
						<ConfirmedDataContext.Provider
							value={{
								confirmedData,
								setConfirmedData,
							}}
						>
							<Table
								participants={participants}
								selectedDates={selectedDates}
							/>
						</ConfirmedDataContext.Provider>
					</ParticipantsContext.Provider>
				</div>
			</main>
		</div>
	)
}

export default App
