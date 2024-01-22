import { useState } from "react"

import { getCurrentCalendar, getCalendar } from "../utils"

import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

function Calendar() {
	const [calendar, setCalendar] = useState(getCurrentCalendar())

	function handleMonthArrows(e) {
		const currentMonthIndexEl = e.target.closest("[data-month-index]")
		const currentMonthIndex = Number(currentMonthIndexEl.dataset.monthIndex)
		const arrowType = e.target.closest("[data-type]").dataset.type

		const monthIndex = arrowType === "next" ? currentMonthIndex + 1 : currentMonthIndex - 1

		const newCalendar = getCalendar(monthIndex, calendar.year)
		setCalendar(newCalendar)
	}

	return (
		<div className="my-8 flex flex-col gap-4">
			<div
				id="calendar"
				className="w-[800px]  bg-indigo-50 p-8 flex flex-col gap-6 rounded-xl">
				<CalendarHeader
					calendarData={calendar}
					onClick={handleMonthArrows}
				/>
				<CalendarBody calendarData={calendar} />
			</div>
		</div>
	)
}

export default Calendar
