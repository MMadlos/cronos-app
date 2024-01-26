import { useState } from "react"

import { getCurrentCalendar, getCalendar } from "../utils"

import SelectedDates from "./SelectedDates"
import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const mockSelectedDates = [
	new Date(2024, 1, 2),
	new Date(2024, 1, 3),
	new Date(2024, 0, 29),
	new Date(2024, 1, 3),
]

function Calendar() {
	const [calendar, setCalendar] = useState(getCurrentCalendar())
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)

	function handleMonthArrows(e) {
		const newMonthIndexEl = e.target.closest("[data-index]")
		const newMonthIndex = Number(newMonthIndexEl.dataset.index)

		const newCalendar = getCalendar(newMonthIndex, calendar.year)
		setCalendar(newCalendar)
	}

	function handleSelectDays(e) {
		const dataDate = e.target.closest("[data-date]").dataset.date
		const formattedDate = dataDate.split("-").map((num) => Number(num))

		const [year, monthIndex, date] = formattedDate

		const newDate = new Date(year, monthIndex, date)
		const newDateInMS = newDate.getTime()

		const currentSelectedInMS = selectedDays.map((dates) => dates.getTime())
		const isIncluded = currentSelectedInMS.includes(newDateInMS)

		if (isIncluded) {
			const newSelectedDays = currentSelectedInMS
				.filter((selected) => selected !== newDateInMS)
				.sort()
				.map((datesMS) => new Date(datesMS))

			setSelectedDays(newSelectedDays)
		}

		if (!isIncluded) {
			const sortedSelectedDays = [...selectedDays, newDate]
				.map((dates) => dates.getTime())
				.sort()
				.map((datesMS) => new Date(datesMS))

			setSelectedDays(sortedSelectedDays)
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
					calendarData={calendar}
					onClick={handleMonthArrows}
				/>
				<CalendarBody
					calendarData={calendar}
					selectedDates={selectedDays}
					onClickAddDate={handleSelectDays}
				/>
			</div>
		</div>
	)
}

export default Calendar
