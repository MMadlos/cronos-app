import { weekDaysName } from "../utils"

function WeekdayCell({ text }) {
	return <div className="p-2 rounded-xl hover:opacity-50 hover:cursor-pointer bg-indigo-400 text-indigo-100">{text}</div>
}

function DateCell({ text, startDay, isFirstDay, isToday, date, onClickAddDate }) {
	const classes = {
		base: "p-2 rounded-xl hover:opacity-50 hover:cursor-pointer ",
		colStart: `col-start-${startDay}`,
		isToday: "bg-indigo-400 text-indigo-100",
		isNotToday: "bg-indigo-200 text-indigo-900",
	}

	const classIfFirstDay = isFirstDay ? classes.colStart : ""
	const classIfIsToday = isToday ? classes.isToday : classes.isNotToday

	return (
		<div
			className={`${classes.base} ${classIfFirstDay} ${classIfIsToday}`}
			data-date={date}
			onClick={onClickAddDate}>
			{text}
		</div>
	)
}

export default function CalendarBody({ calendarData, onClickAddDate }) {
	const { maxDays, firstWeekDayIndex, year, monthIndex } = calendarData

	const currentDate = new Date().getDate()
	const currentMonth = new Date().getMonth()

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
						<WeekdayCell
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
					const isToday = date === currentDate && monthIndex === currentMonth

					return (
						<DateCell
							key={index}
							text={date + 1}
							startDay={firstWeekDayIndex}
							isFirstDay={isFirstDay}
							isToday={isToday}
							date={`${year}-${monthIndex}-${date + 1}`}
							onClickAddDate={onClickAddDate}
						/>
					)
				})}
			</div>
		</div>
	)
}
