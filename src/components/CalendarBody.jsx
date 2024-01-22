import { weekDaysName } from "../utils"

function CalendarCell({ text, startDay, isFirstDay }) {
	if (isFirstDay) {
		const columnStart = `col-start-${startDay}`
		const classes = `p-2 bg-indigo-200 text-indigo-700 rounded-lg ${columnStart}`
		return <div className={classes}>{text}</div>
	} else {
		return <div className={`p-2 bg-indigo-200 text-indigo-700 rounded-lg`}>{text}</div>
	}
}

export default function CalendarBody({ daysOfMonth }) {
	const allDays = [...Array(daysOfMonth).keys()]
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
					const startDay = "3"

					return (
						<CalendarCell
							key={index}
							text={date + 1}
							startDay={isFirstDay && startDay}
							isFirstDay={isFirstDay}
						/>
					)
				})}
			</div>
		</div>
	)
}
