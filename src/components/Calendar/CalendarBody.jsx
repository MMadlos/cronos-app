import { getWeekdays, getMonthGridContent, getGridMonthType } from "../../utils"
import CalendarCell from "./CalendarCell"

export default function CalendarBody({
	calendarData,
	selectedDates,
	onClickDate,
	onClickWeekday,
}) {
	return (
		<div
			id="all-dates"
			className="flex flex-col items-center justify-center gap-2 "
		>
			<DaysGrid onClickWeekday={onClickWeekday} />
			<DateGrid
				calendarData={calendarData}
				selectedDates={selectedDates}
				onClickDate={onClickDate}
			/>
		</div>
	)
}

function DateGrid({ calendarData, selectedDates, onClickDate }) {
	const { year, monthIndex } = calendarData

	const filteredSelectedDates = selectedDates
		.filter((dates) => dates.getMonth() === monthIndex)
		.map((dates) => dates.getDate())

	const gridMonthContent = getMonthGridContent(year, monthIndex)
	const gridMonthDataType = getGridMonthType(
		gridMonthContent,
		monthIndex,
		filteredSelectedDates
	)

	return (
		<div
			id="dates"
			className="grid w-full grid-cols-7 items-center justify-items-center gap-1 "
		>
			{gridMonthContent.map((date, index) => {
				// dataType = "empty" | "unavailable" | "today" | "selected" | "default"

				return (
					<CalendarCell
						key={index}
						date={date}
						dataType={gridMonthDataType[index]}
						onClickDate={onClickDate}
					/>
				)
			})}
		</div>
	)
}

function DaysGrid({ onClickWeekday }) {
	const locale = "es"
	const format = "short"
	const allWeekDays = getWeekdays(locale, format)

	return (
		<div
			id="weekDays"
			className="grid w-full grid-cols-7 items-center justify-items-center gap-1 border-b-2 border-zinc-200 pb-2"
		>
			{allWeekDays.map((day, index) => {
				return (
					<button
						key={index}
						data-week-index={index + 1}
						onClick={onClickWeekday}
						className="flex size-10 items-center justify-center rounded-md border-2 border-transparent bg-zinc-100 font-medium text-zinc-600 hover:cursor-pointer hover:bg-zinc-200"
					>
						{day}
					</button>
				)
			})}
		</div>
	)
}
