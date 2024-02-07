import "./App.css"
import { useState } from "react"
import { getAllSelectedWeekdayDates } from "./utils"
import { mockSelectedDates, mockParticipants } from "./mockData"

import Calendar from "./components/Calendar/Calendar"
import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"
import Header from "./components/Header/Header"
import EventInfo from "./components/EventInfo/EventInfo"
import Instructions from "./components/CalendarProcess/Instructions"

const currentDate = new Date()
const currentMonthIndex = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const initiCalendarData = {
	year: currentYear,
	monthIndex: currentMonthIndex,
}

const calendarProcess = {
	init: "instructions",
	pickDates: "calendar",
	peopleList: "list",
	table: "table",
}
// TODO - Add buttons behaviours in stage 0. When no dates are selected -> Reset not available and done not active.

function App() {
	const [calendarData, setCalendarData] = useState(initiCalendarData)
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)

	const [participants, setParticipants] = useState(mockParticipants)
	const [inputValue, setInputValue] = useState("")

	const [stage, setStage] = useState(calendarProcess.init)

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

	function handleChangeInput(e) {
		setInputValue(e.target.value)
	}

	function handleAddParticipants(e) {
		// TODO - Add message for empty input
		if (inputValue === "") return

		if (e.key === "Enter" || e.type === "click") {
			const newPerson = { id: crypto.randomUUID(), name: inputValue }
			setParticipants((prev) => [...prev, newPerson])
			setInputValue("")
		}
	}

	function handleClickRemove(e) {
		const userIndex = e.target.closest("button").dataset.index
		const list = participants.filter((person) => person.id !== userIndex)
		setParticipants(list)
	}

	return (
		<div className="container mx-auto min-h-dvh min-w-[300px] max-w-[800px] bg-zinc-50 px-8">
			<Header />
			<EventInfo />

			<main className="my-8">
				<h2 className="text-left text-lg font-semibold text-zinc-400">
					Calendario
				</h2>
				<div
					className="mt-4 flex flex-col gap-8 rounded-xl bg-zinc-50  
				bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 shadow-sm"
				>
					{stage === calendarProcess.init && (
						<div
							className="mt-4 flex flex-col gap-8 rounded-md bg-white  
									 p-6 shadow-sm"
						>
							<Instructions
								onClickAddCalendar={() =>
									setStage(calendarProcess.pickDates)
								}
							/>
						</div>
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
						<UserList
							participants={participants}
							inputValue={inputValue}
							onChangeInput={handleChangeInput}
							onKeyDownEnter={handleAddParticipants}
							onClickAdd={handleAddParticipants}
							onClickRemove={handleClickRemove}
							onClickNext={() => setStage(calendarProcess.table)}
							onClickReturn={() =>
								setStage(calendarProcess.pickDates)
							}
						/>
					)}
					{stage === calendarProcess.table && (
						<Table
							participants={participants}
							selectedDates={selectedDays}
						/>
					)}
				</div>
			</main>
		</div>
	)
}

export default App
