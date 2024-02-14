import "./App.css"
import { useState, createContext, useEffect } from "react"
import {
	getAllSelectedWeekdayDates,
	initCalendarData,
	getIntlMonthLong,
} from "./utils"
import {
	mockSelectedDates,
	mockParticipants,
	mockConfirmedData,
	mockSummaryData,
} from "./mockData"

import Calendar from "./components/Calendar/Calendar"
import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"
import Header from "./components/Header/Header"
import EventInfo from "./components/EventInfo/EventInfo"
import Instructions from "./components/CalendarProcess/Instructions"
import CalendarProcess from "./components/CalendarProcess/CalendarProcess"
import SummaryCalendar from "./components/SummaryCalendar/SummaryCalendar"

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
	setSelectedDays: () => {},
})

export const ConfirmedDataContext = createContext({
	confirmedData: {},
	setConfirmedData: () => {},
})

function App() {
	const [calendarData, setCalendarData] = useState(initCalendarData)
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)
	const [participants, setParticipants] = useState(mockParticipants)
	const [confirmedData, setConfirmedData] = useState(mockConfirmedData)

	const [stage, setStage] = useState(calendarProcess.table)

	// ALL DATA NEEDED FOR SUMMARY TABLE
	const [summaryData, setSummaryData] = useState([])

	function mapSummaryData() {
		const newSummaryData = []

		selectedDays.forEach((dateTime) => {
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

			// Search monthData
			const [monthData] = newSummaryData.filter(
				(monthData) => monthData.monthName === monthName
			)

			// Search dateData
			const currentDate = dateTimeObj.getDate()
			const [dateData] = monthData.selectedDates.filter(
				(dateData) => dateData.date === currentDate
			)

			dateData.confirmedList.push(participant)
			dateData.ratio = dateData.confirmedList.length / participantsCount
		})

		setSummaryData(newSummaryData)
	}, [confirmedData])

	function handleMonthArrows(e) {
		const newMonthIndexEl = e.target.closest("[data-index]").dataset.index
		const newMonthIndex = Number(newMonthIndexEl)

		const newCalendarData = {
			year: calendarData.year,
			monthIndex: newMonthIndex,
		}

		setCalendarData(newCalendarData)
	}

	function handleSelectDays(e) {
		const dataDate = e.target.closest("[data-date]").dataset.date

		const { year, monthIndex } = calendarData

		const selectedDate = new Date(year, monthIndex, dataDate)
		const selectedDateTime = selectedDate.getTime()

		const selectedDaysTime = selectedDays.map((dates) => dates.getTime())
		const isIncluded = selectedDaysTime.includes(selectedDateTime)

		if (isIncluded) {
			const newSelectedDays = selectedDaysTime
				.filter((selected) => selected !== selectedDateTime)
				.sort()
				.map((datesTime) => new Date(datesTime))

			setSelectedDays(newSelectedDays)
		}

		if (!isIncluded) {
			const newSelectedDays = [...selectedDays, selectedDate]
				.map((dates) => dates.getTime())
				.sort()
				.map((datesMS) => new Date(datesMS))

			setSelectedDays(newSelectedDays)
		}
	}

	function handleSelectWeek(e) {
		const weekdayIndex = e.target.closest("button").dataset.weekIndex

		const { year, monthIndex } = calendarData

		const selectedDatesArray = getAllSelectedWeekdayDates(
			year,
			monthIndex,
			weekdayIndex
		)

		const selectedDatesTime = selectedDatesArray.map((date) => {
			const newDate = new Date(year, monthIndex, date)
			return newDate.getTime()
		})

		const currentSelectedDaysTime = selectedDays.map((dates) => {
			return dates.getTime()
		})

		const areAllAlreadySelected = selectedDatesTime.every((dates) =>
			currentSelectedDaysTime.includes(dates)
		)

		if (!areAllAlreadySelected) {
			selectedDatesTime.forEach((dateTime) => {
				const isIncluded = currentSelectedDaysTime.includes(dateTime)
				if (isIncluded) return

				currentSelectedDaysTime.push(dateTime)
			})

			const newSelectedDays = currentSelectedDaysTime
				.sort()
				.map((datesTime) => new Date(datesTime))

			setSelectedDays(newSelectedDays)
		}

		if (areAllAlreadySelected) {
			const newSelectedDays = currentSelectedDaysTime
				.filter((datesTime) => {
					const isIncluded = selectedDatesTime.includes(datesTime)
					if (!isIncluded) return datesTime
				})
				.sort()
				.map((dates) => new Date(dates))

			setSelectedDays(newSelectedDays)
		}
	}

	return (
		<div className="flex flex-row">
			<div
				className=" border-r-2 border-zinc-200 bg-zinc-50 p-2"
				id="aside-nav"
			>
				<SummaryCalendar summaryData={summaryData} />
			</div>

			<div className="container mx-auto flex h-screen max-h-screen min-w-[300px] max-w-[800px] flex-col gap-8 bg-zinc-50 px-8 py-2">
				<Header />
				<EventInfo />
				<CalendarProcess>
					{stage === calendarProcess.init && (
						<Instructions
							onClickAddCalendar={() =>
								setStage(calendarProcess.pickDates)
							}
						/>
					)}

					{stage === calendarProcess.pickDates && (
						<Calendar
							calendarData={calendarData}
							selectedDays={selectedDays}
							onClickArrows={handleMonthArrows}
							onClickDate={handleSelectDays}
							onClickWeekday={handleSelectWeek}
							onClickReset={() => setSelectedDays([])}
							onClickDone={() => {
								if (selectedDays.length === 0) return
								setStage(calendarProcess.peopleList)
							}}
						/>
					)}

					{stage === calendarProcess.peopleList && (
						<ParticipantsContext.Provider
							value={{ participants, setParticipants }}
						>
							<UserList
								onClickNext={() =>
									setStage(calendarProcess.table)
								}
								onClickReturn={() =>
									setStage(calendarProcess.pickDates)
								}
							/>
						</ParticipantsContext.Provider>
					)}
					{stage === calendarProcess.table && (
						<ConfirmedDataContext.Provider
							value={{
								confirmedData,
								setConfirmedData,
							}}
						>
							<Table
								participants={participants}
								selectedDates={selectedDays}
							/>
						</ConfirmedDataContext.Provider>
					)}
				</CalendarProcess>
			</div>
		</div>
	)
}

export default App
