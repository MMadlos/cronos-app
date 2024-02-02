import "./App.css"
import { useState } from "react"
import { getAllSelectedWeekdayDates } from "./utils"
import { mockSelectedDates, mockParticipants } from "./mockData"

import Calendar from "./components/Calendar/Calendar"
import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"

const currentDate = new Date()
const currentMonthIndex = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const initiCalendarData = {
	year: currentYear,
	monthIndex: currentMonthIndex,
}

const initParticipants = []
for (let person of mockParticipants) {
	initParticipants.push(person.name)
}

function App() {
	const [calendarData, setCalendarData] = useState(initiCalendarData)
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)

	const [participants, setParticipants] = useState(mockParticipants)
	const [inputValue, setInputValue] = useState("")

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
		<main className="flex min-h-screen flex-col items-center justify-center bg-indigo-100">
			<Calendar
				calendarData={calendarData}
				selectedDays={selectedDays}
				onClickArrows={handleMonthArrows}
				onClickDate={handleSelectDays}
				onClickWeekday={handleSelectWeek}
			/>
			<UserList
				participants={participants}
				inputValue={inputValue}
				onChangeInput={handleChangeInput}
				onKeyDownEnter={handleAddParticipants}
				onClickAdd={handleAddParticipants}
				onClickRemove={handleClickRemove}
			/>

			<Table participants={participants} selectedDates={selectedDays} />
		</main>
	)
}

export default App
