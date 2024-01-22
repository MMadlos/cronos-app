import { useState } from "react"

import { getCalendar } from "../utils"

import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const now = new Date()
const currentYear = now.getFullYear()
const currentMonthIndex = now.getMonth()

function Calendar() {
	const currentMonth = getCalendar(currentMonthIndex, currentYear)

	const data = {
		year: currentYear,
		monthIndex: currentMonthIndex,
		month: currentMonth.month,
		maxDays: currentMonth.maxDays,
		firstWeekDay: currentMonth.firstWeekDay,
	}

	// State: cuando el state cambie, los parámetros de CalendarHeader y CalendarBody deben cambiar
	const [calendar, setCalendar] = useState(data)
	const { year, maxDays, firstWeekDay } = calendar

	function handleNextMonth(e) {
		const currentMonthIndexEl = e.target.closest("[data-month-index]")
		const currentMonthIndex = Number(currentMonthIndexEl.dataset.monthIndex)

		const typeMonthEl = e.target.closest("[data-type]")
		const typeMonth = typeMonthEl.dataset.type

		const newMonthIndex = typeMonth === "next" ? currentMonthIndex + 1 : currentMonthIndex - 1

		const getNewCalendar = getCalendar(newMonthIndex, year)
		const newCalendar = {
			year,
			monthIndex: newMonthIndex,
			month: getNewCalendar.month,
			maxDays: getNewCalendar.maxDays,
			firstWeekDay: getNewCalendar.firstWeekDay,
		}
		setCalendar(newCalendar)
	}

	return (
		<div className="my-8 flex flex-col gap-4">
			<div
				id="calendar"
				className="w-[800px]  bg-indigo-50 p-8 flex flex-col gap-6 rounded-xl">
				<CalendarHeader
					calendarData={calendar}
					onClick={handleNextMonth}
				/>
				<CalendarBody
					daysOfMonth={maxDays}
					startsOn={firstWeekDay}
				/>
			</div>
		</div>
	)
}

export default Calendar
