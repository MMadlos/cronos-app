import { useState } from "react"

import { getCurrentCalendar, getCalendar, getIntlMonthShort, getIntlWeekdayShort } from "../utils"

import SelectedDates from "./SelectedDates"
import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const mockSelectedDates = [new Date(2024, 0, 2), new Date(2024, 0, 3), new Date(2024, 0, 19)]

function Calendar() {
	const [calendar, setCalendar] = useState(getCurrentCalendar())
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)

	function handleMonthArrows(e) {
		const currentMonthIndexEl = e.target.closest("[data-month-index]")
		const currentMonthIndex = Number(currentMonthIndexEl.dataset.monthIndex)
		const arrowType = e.target.closest("[data-type]").dataset.type

		const monthIndex = arrowType === "next" ? currentMonthIndex + 1 : currentMonthIndex - 1

		const newCalendar = getCalendar(monthIndex, calendar.year)
		setCalendar(newCalendar)
	}

	function handleAddSelectedDays(e) {
		// TODO - If the selected day is already selected (in UI) => return
		const dataDate = e.target.closest("[data-date]").dataset.date
		const formattedDate = dataDate.split("-").map((num) => Number(num))

		const [year, monthIndex, date] = formattedDate

		const newDate = new Date(year, monthIndex, date)
		const newDateInMS = newDate.getTime()

		// Check if the selected date is already in selectedDays
		const currentSelectedInMS = selectedDays.map((dates) => dates.getTime())
		const isIncluded = currentSelectedInMS.includes(newDateInMS)

		if (isIncluded) return

		// Date objects needs to be in .getTime() format to sort them
		const newSelectedDays = [...selectedDays, newDate]
		const sortedSelectedDaysInMS = newSelectedDays.map((dates) => dates.getTime()).sort()
		const sortedSelectedDays = sortedSelectedDaysInMS.map((datesMS) => new Date(datesMS))

		setSelectedDays(sortedSelectedDays)
	}

	return (
		<div className="my-8 flex flex-col gap-4">
			<div>
				<p>Selected days</p>
				<SelectedDates dates={selectedDays} />
			</div>
			<div
				id="calendar"
				className="w-[800px]  bg-indigo-50 p-8 flex flex-col gap-6 rounded-xl">
				<CalendarHeader
					calendarData={calendar}
					onClick={handleMonthArrows}
				/>
				<CalendarBody
					calendarData={calendar}
					onClickAddDate={handleAddSelectedDays}
				/>
			</div>
		</div>
	)
}

export default Calendar
