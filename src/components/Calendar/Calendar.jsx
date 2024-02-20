import { useState } from "react"
import { mockSelectedDates } from "../../mockData"
import {
	getCalendarContent,
	getIntlMonthLong,
	getMonthGridContent,
} from "../../utils"
import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const dateToday = new Date()

const year = dateToday.getFullYear()
const monthIndex = dateToday.getMonth()
const monthName = getIntlMonthLong(dateToday)
const initCalendarData = {
	year,
	monthIndex,
	monthName,
	contentGrid: getMonthGridContent(year, monthIndex),
	typeGrid: [],
}

function Calendar({
	// calendarData,
	selectedDays,
	// onClickDate,
	onClickWeekday,
	// onClickArrows,
	// onClickReset,
	onClickDone,
}) {
	const [calendarData, setCalendarData] = useState(initCalendarData)
	const [selectedDates, setSelectedDates] = useState(mockSelectedDates)

	const { monthIndex } = calendarData

	function handleClickArrow(e) {
		const monthIndex = Number(e.target.closest("button").dataset.index)

		const newDate = new Date(year, monthIndex)
		const monthName = getIntlMonthLong(newDate)

		const newDateData = {
			year: newDate.getFullYear(),
			monthIndex,
			monthName,
		}

		setCalendarData(newDateData)
	}

	function handleOnClickDate(e) {
		const dataDate = e.target.closest("button").dataset.date
		const { year, monthIndex } = calendarData

		const newDate = new Date(year, monthIndex, dataDate)
		const newDateTime = newDate.getTime()

		const selectedDatesTime = selectedDates.map((date) => date.getTime())

		const isIncluded = selectedDatesTime.includes(newDateTime)
		if (!isIncluded) return setSelectedDates((prev) => [...prev, newDate])

		const newSelectedDates = selectedDates.filter(
			(date) => date.getTime() !== newDateTime
		)
		setSelectedDates(newSelectedDates)
	}

	const onClickReset = () => setSelectedDates([])

	return (
		<div
			id="calendar"
			className="mx-auto flex w-fit flex-col gap-2 rounded-md border-2 border-zinc-100 bg-zinc-50 p-4 shadow-lg "
		>
			<CalendarHeader
				onClick={handleClickArrow}
				calendarData={calendarData}
			>
				<h4 className="text-sm font-medium text-zinc-400">
					{calendarData.year}
				</h4>
				<div className="flex w-full flex-row items-center justify-between">
					<button
						className="group"
						data-index={monthIndex - 1}
						disabled={monthIndex - 1 < dateToday.getMonth()}
					>
						<i
							className={`fa-solid fa-arrow-left p-2 text-2xl text-zinc-700 hover:opacity-50 group-disabled:text-zinc-200`}
						/>
					</button>

					<button className="rounded bg-zinc-100 px-6 py-2 hover:bg-zinc-200">
						<h3 className="text-2xl font-semibold text-zinc-600">
							{calendarData.monthName}
						</h3>
					</button>

					<button>
						<i
							className={`fa-solid fa-arrow-right p-2 text-2xl text-zinc-700 hover:opacity-50 group-disabled:text-zinc-200`}
						/>
					</button>
				</div>
			</CalendarHeader>
			<CalendarBody
				calendarData={calendarData}
				selectedDates={selectedDates}
				onClickDate={handleOnClickDate}
				onClickWeekday={onClickWeekday}
			/>
			<div className="mt-4 flex flex-row items-center justify-between">
				<button
					className="font-medium text-red-600 underline underline-offset-4 hover:opacity-50"
					onClick={onClickReset}
				>
					Reset dates
				</button>
				<button
					className="rounded-lg bg-zinc-900 px-6 py-2 font-semibold text-zinc-50 hover:opacity-50"
					onClick={onClickDone}
				>
					Done
				</button>
			</div>
		</div>
	)
}

export default Calendar
