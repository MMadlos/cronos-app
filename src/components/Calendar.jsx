import { useState } from "react"

import SelectedDates from "./SelectedDates"
import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const mockSelectedDates = [
	new Date(2024, 1, 2),
	new Date(2024, 1, 3),
	new Date(2024, 0, 31),
	new Date(2024, 1, 8),
]

const currentDate = new Date()
const currentMonthIndex = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const initiCalendarData = {
	year: currentYear,
	monthIndex: currentMonthIndex,
}

function Calendar() {
	const [calendarData, setCalendarData] = useState(initiCalendarData)
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)

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

	return (
		<div className="my-8 flex flex-col gap-4">
			<SelectedDates dates={selectedDays} />
			<div
				id="calendar"
				className="flex w-fit flex-col gap-6 rounded-xl bg-zinc-50 p-8"
			>
				<CalendarHeader
					calendarData={calendarData}
					onClick={handleMonthArrows}
				/>
				<CalendarBody
					calendarData={calendarData}
					selectedDates={selectedDays}
					onClickDate={handleSelectDays}
				/>
			</div>
		</div>
	)
}

export default Calendar
