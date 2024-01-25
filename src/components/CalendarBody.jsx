import { getCalendar, getWeekdays } from "../utils"

function WeekdayCell({ text }) {
	return (
		<div className="rounded-xl bg-indigo-400 p-2 text-indigo-100 hover:cursor-pointer hover:opacity-50">
			{text}
		</div>
	)
}

function DateCell({ date, onClickAddDate, monthIndex, filteredDates }) {
	const dateToday = new Date()

	const isPastDate =
		date < dateToday.getDate() && monthIndex === dateToday.getMonth()

	const isSelected = filteredDates.includes(date)

	const classes = {
		base: "flex justify-center rounded-md font-medium items-center size-12 border-2",
		isEmpty: "bg-zinc-100 border-zinc-100",
		notAvailable: "bg-zinc-100 border-zinc-100 text-zinc-300",
		isToday: "bg-zinc-50 border-zinc-500 text-zinc-700 hover:bg-zinc-200",
		isSelected: "bg-zinc-400 border-zinc-400 text-zinc-500",
		default:
			"bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-200 hover:cursor-pointer",
	}

	const getClasses = () => {
		if (date === undefined) return classes.isEmpty
		if (isPastDate) return classes.notAvailable
		if (isSelected) return classes.isSelected
		return classes.default
	}

	const classType = getClasses()

	return (
		<div
			className={`${classes.base} ${classType}`}
			data-date={date}
			onClick={onClickAddDate}
			data-selected={isSelected}
		>
			{date}
		</div>
	)
}

function DateGrid({ firstWeekDayIndex, maxDays, monthIndex, filteredDates }) {
	const fullMonth = getMonthArray(firstWeekDayIndex, maxDays)
	return (
		<div
			id="dates"
			className="grid w-full grid-cols-7 items-center justify-items-center gap-1 "
		>
			{fullMonth.map((date, index) => {
				return (
					<DateCell
						key={index}
						date={date}
						monthIndex={monthIndex}
						filteredDates={filteredDates}
					/>
				)
			})}
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

export default function CalendarBody({
	calendarData,
	selectedDates,
	onClickAddDate,
}) {
	const { maxDays, firstWeekDayIndex, year, monthIndex } = calendarData

	const getFilteredDates = selectedDates.filter(
		(date) => date.getMonth() === monthIndex
	)
	const filteredSelectedDates = getFilteredDates.map((dates) =>
		dates.getDate()
	)

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
			className="flex flex-col items-center justify-center gap-4 "
		>
			<div
				id="weekDays"
				className="grid w-full grid-cols-7 gap-1 text-center"
			>
				{getWeekdays(locale, format).map((day, index) => {
					return <WeekdayCell div key={index} text={day} />
				})}
			</div>
			<DateGrid
				firstWeekDayIndex={firstWeekDayIndex}
				maxDays={maxDays}
				monthIndex={monthIndex}
				filteredDates={filteredSelectedDates}
			/>
		</div>
	)
}
