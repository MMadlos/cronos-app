import { getCurrentCalendar } from "../utils"

import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

function Calendar() {
	const currentCalendar = getCurrentCalendar()
	const { currentYear, currentMonth, currentMaxDays, firstWeekDay } = currentCalendar

	return (
		<div className="my-8 flex flex-col gap-4">
			<div
				id="calendar"
				className="w-[800px]  bg-indigo-50 p-8 flex flex-col gap-6 rounded-xl">
				<CalendarHeader
					month={currentMonth}
					currentYear={currentYear}
				/>
				<CalendarBody
					daysOfMonth={currentMaxDays}
					startsOn={firstWeekDay}
				/>
			</div>
		</div>
	)
}

export default Calendar
