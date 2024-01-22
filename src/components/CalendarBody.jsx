import { weekDaysName } from "../utils"

function CalendarCell({ text, startDay, isFirstDay, isToday }) {
	const classes = {
		base: "p-2 rounded-lg",
		colStart: `col-start-${startDay}`,
		isToday: "bg-indigo-200 text-indigo-700",
		isNotToday: "bg-indigo-900 text-indigo-200",
	}

	const classIfFirstDay = isFirstDay ? classes.colStart : ""
	const classIfIsToday = isToday ? classes.isToday : classes.isNotToday

	return <div className={classes.base + classIfFirstDay + classIfIsToday}>{text}</div>
}

export default function CalendarBody({ calendarData }) {
	const { maxDays, firstWeekDayIndex } = calendarData
	const currentDate = new Date().getDate()

	const allDays = [...Array(maxDays).keys()]
	return (
		<div
			id="all-dates"
			className="flex flex-col justify-center items-center gap-4">
			<div
				id="weekDays"
				className="grid grid-cols-7 w-full text-center gap-1">
				{weekDaysName.map((day, index) => {
					return (
						<CalendarCell
							key={index}
							text={day}
						/>
					)
				})}
			</div>
			<div
				id="dates"
				className="grid grid-cols-7 w-full text-center gap-1">
				{allDays.map((date, index) => {
					const isFirstDay = index === 0
					const isToday = date === currentDate

					return (
						<CalendarCell
							key={index}
							text={date + 1}
							startDay={isFirstDay && firstWeekDayIndex}
							isFirstDay={isFirstDay}
							isToday={isToday}
						/>
					)
				})}
			</div>
		</div>
	)
}
