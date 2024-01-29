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
				className="grid w-full grid-cols-7 items-center justify-items-center gap-1 border-b-2 border-zinc-600 pb-2"
			>
				{allWeekDays.map((day, index) => {
					return (
						<button
							key={index}
							data-week-index={index + 1}
							className="flex size-12 items-center justify-center rounded-md border-2 border-transparent bg-zinc-50 font-medium text-zinc-600 hover:cursor-pointer hover:bg-zinc-200"
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
