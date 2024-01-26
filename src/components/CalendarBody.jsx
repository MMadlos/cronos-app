import { getMonthArray, getWeekdays } from "../utils"
import CalendarCell from "./CalendarCell"

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

	const allWeekDays = getWeekdays(locale, format)
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
				{allWeekDays.map((day, index) => {
					return (
						<button
							key={index}
							data-week-index={index + 1}
							className="rounded-xl bg-indigo-400 p-2 text-indigo-100 hover:cursor-pointer hover:opacity-50"
						>
							{day}
						</button>
					)
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

function DateGrid({ firstWeekDayIndex, maxDays, monthIndex, filteredDates }) {
	const fullMonth = getMonthArray(firstWeekDayIndex, maxDays)
	return (
		<div
			id="dates"
			className="grid w-full grid-cols-7 items-center justify-items-center gap-1 "
		>
			{fullMonth.map((date, index) => {
				return (
					<CalendarCell
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
