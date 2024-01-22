import { weekDaysName } from "../utils"

function CalendarCell({ text, startDay, isFirstDay }) {
	const classes = {
		base: "p-2 bg-indigo-200 text-indigo-700 rounded-lg",
		colStart: `col-start-${startDay}`,
	}

	const className = isFirstDay ? `${classes.base} ${classes.colStart}` : `${classes.base}`

	return <div className={className}>{text}</div>
}

export default function CalendarBody({ calendarData }) {
	const { maxDays, firstWeekDayIndex } = calendarData
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

					return (
						<CalendarCell
							key={index}
							text={date + 1}
							startDay={isFirstDay && firstWeekDayIndex}
							isFirstDay={isFirstDay}
						/>
					)
				})}
			</div>
		</div>
	)
}
