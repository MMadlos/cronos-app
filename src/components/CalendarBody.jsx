import { getCalendar, getWeekdays } from "../utils"

function WeekdayCell({ text }) {
	return <div className="p-2 rounded-xl hover:opacity-50 hover:cursor-pointer bg-indigo-400 text-indigo-100">{text}</div>
}

function DateCell({ text, startDay, isFirstDay, isToday, date, onClickAddDate, isSelected }) {
	const classes = {
		base: "p-2 rounded-xl hover:opacity-50 hover:cursor-pointer ",
		colStart: `col-start-${startDay}`,
		isToday: "bg-indigo-400 text-indigo-100",
		isNotToday: "bg-indigo-200 text-indigo-900",
		isSelected: "bg-gray-200",
	}

	const classIfFirstDay = isFirstDay ? classes.colStart : ""
	const classIfIsToday = isToday ? classes.isToday : classes.isNotToday
	const classIfSelected = isSelected ? classes.isSelected : ""

	return (
		<div
			className={`${classes.base} ${classIfFirstDay} ${classIfIsToday} ${classIfSelected}`}
			data-date={date}
			onClick={onClickAddDate}
			data-selected={isSelected}>
			{text}
		</div>
	)
}

function getMonthArray(firstIndex, lastIndex) {
	const calendarArray = Array(35).fill()

	let count = 1
	calendarArray.forEach((_, index) => {
		if (index < firstIndex - 1) return
		if (index - firstIndex + 1 > lastIndex - 1) return

		calendarArray[index] = count
		count++
	})

	return calendarArray
}

export default function CalendarBody({ calendarData, selectedDates, onClickAddDate }) {
	const { maxDays, firstWeekDayIndex, year, monthIndex } = calendarData
	const fullMonth = getMonthArray(firstWeekDayIndex, maxDays)
	// States: default / hovered / selected / today / empty / notAvailable
	/*
	- Renderizar 5 filas de 7 celdas -> 35 celdas
	const allCells = Array(35).fill("")

	- Ver a partir de qué fila deben dejar de ser "empty"
	- Empezar a renderizar números a partir de firstWeekDayIndex
	- Si es el día anterior al de hoy, deben ser notAvailable
	- Volver a renderizar empty a partir del último número
	- Renderizar today

	*/

	const getFilteredDates = selectedDates.filter((date) => date.getMonth() === monthIndex)
	const filteredSelectedDates = getFilteredDates.map((dates) => dates.getDate())

	const locale = "es"
	const format = "short"

	const currentDate = new Date().getDate()
	const currentMonth = new Date().getMonth()
	const isCurrentMonth = currentMonth === monthIndex

	const maxDaysArray = [...Array(maxDays).keys()]
	const allDays = maxDaysArray.map((number) => number + 1)

	return (
		<div
			id="all-dates"
			className="flex flex-col justify-center items-center gap-4">
			<div
				id="weekDays"
				className="grid grid-cols-7 w-full text-center gap-1">
				{getWeekdays(locale, format).map((day, index) => {
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
				className="grid grid-cols-7 w-full items-center justify-items-center gap-1">
				{fullMonth.map((date, index) => {
					return (
						<div
							key={index}
							className="size-12 bg-zinc-100 flex justify-center items-center rounded-lg">
							<p className="text-zinc-600 font-medium ">{date}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

// Backup
/*
{allDays.map((date, index) => {
	const isFirstDay = index === 0
	const isToday = date === currentDate && isCurrentMonth
	const isSelected = filteredSelectedDates.includes(date)

	return (
		<DateCell
			key={index}
			text={date}
			startDay={firstWeekDayIndex}
			isFirstDay={isFirstDay}
			isToday={isToday}
			date={`${year}-${monthIndex}-${date}`}
			onClickAddDate={onClickAddDate}
			isSelected={isSelected}
		/>
	)
})}
*/
