import { getWeekdays, getMonthGridContent } from "../utils"
import CalendarCell from "./CalendarCell"

export default function CalendarBody({
	calendarData,
	selectedDates,
	onClickDate,
}) {
	const getFilteredDates = selectedDates.filter(
		(date) => date.getMonth() === calendarData.monthIndex
	)
	const filteredSelectedDates = getFilteredDates.map((dates) =>
		dates.getDate()
	)

	const locale = "es"
	const format = "short"
	const allWeekDays = getWeekdays(locale, format)

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
				calendarData={calendarData}
				filteredDates={filteredSelectedDates}
				onClickDate={onClickDate}
			/>
		</div>
	)
}

function DateGrid({ calendarData, filteredDates, onClickDate }) {
	const { year, monthIndex } = calendarData

	const gridMonthContent = getMonthGridContent(year, monthIndex)

	return (
		<div
			id="dates"
			className="grid w-full grid-cols-7 items-center justify-items-center gap-1 "
		>
			{gridMonthContent.map((date, index) => {
				return (
					<CalendarCell
						key={index}
						date={date}
						monthIndex={monthIndex}
						filteredDates={filteredDates}
						onClickDate={onClickDate}
					/>
				)
			})}
		</div>
	)
}
