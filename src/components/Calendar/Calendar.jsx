import { useState } from "react"

import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const currentDate = new Date()
const currentMonthIndex = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const initiCalendarData = {
	year: currentYear,
	monthIndex: currentMonthIndex,
}

function Calendar({
	calendarData,
	selectedDays,
	onClickDate,
	onClickWeekday,
	onClickArrows,
}) {
	return (
		<div
			id="calendar"
			className="flex w-fit flex-col gap-6 rounded-xl bg-zinc-50 p-8 shadow-md"
		>
			<CalendarHeader
				calendarData={calendarData}
				onClick={onClickArrows}
			/>
			<CalendarBody
				calendarData={calendarData}
				selectedDates={selectedDays}
				onClickDate={onClickDate}
				onClickWeekday={onClickWeekday}
			/>
		</div>
	)
}

export default Calendar
