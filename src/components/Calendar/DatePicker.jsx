import { useState, useContext } from "react"
import { SelectedDatesContext } from "../../App"

import {
	getAllSelectedWeekdayDates,
	getCalendarContent,
	getIntlMonthLong,
	getWeekdays,
} from "../../utils"

const dateToday = new Date()
const currentYear = dateToday.getFullYear()
const currentMonthIndex = dateToday.getMonth()
const initCalendar = {
	year: currentYear,
	monthIndex: currentMonthIndex,
}

export default function DatePicker({ onClick }) {
	const [calendar, setCalendar] = useState(initCalendar)
	const { selectedDates, setSelectedDates } = useContext(SelectedDatesContext)

	const { year, monthIndex } = calendar
	const monthName = getIntlMonthLong(new Date(year, monthIndex))

	function handleClickArrow(e) {
		const monthIndex = Number(e.target.closest("button").dataset.index)

		const date = new Date(dateToday.getTime())
		date.setMonth(monthIndex)

		const year = date.getFullYear()

		setCalendar({ year, monthIndex })
	}

	function handleClickDate(dataDate) {
		const newDate = new Date(year, monthIndex, dataDate)
		const newDateTime = newDate.getTime()

		const isSelected = selectedDates.includes(newDateTime)

		if (!isSelected) setSelectedDates((prev) => [...prev, newDateTime])

		if (isSelected) {
			const newSelectedDates = selectedDates.filter(
				(date) => date !== newDateTime
			)
			setSelectedDates(newSelectedDates)
		}
	}

	function handleClickWeekday(e) {
		const weekdayIndex = e.target.closest("button").dataset.index
		const newSelectedDates = getAllSelectedWeekdayDates(
			year,
			monthIndex,
			weekdayIndex
		)

		const newSelectedDatesTime = newSelectedDates
			.map((date) => new Date(year, monthIndex, date))
			.map((date) => date.getTime())

		const areAllIncluded = newSelectedDatesTime
			.map((data) => selectedDates.includes(data))
			.every((comparison) => comparison === true)

		if (areAllIncluded) {
			const removedDates = selectedDates.filter(
				(date) => !newSelectedDatesTime.includes(date)
			)
			return setSelectedDates(removedDates)
		}

		if (!areAllIncluded) {
			return setSelectedDates((prev) => [
				...prev,
				...newSelectedDatesTime,
			])
		}
	}

	function handleClickReset() {
		setSelectedDates([])
	}

	const currentSelectedDates = selectedDates
		.map((dateTime) => new Date(dateTime))
		.filter((dateTime) => dateTime.getFullYear() === year)
		.filter((dateTime) => dateTime.getMonth() === monthIndex)
		.map((dateTime) => dateTime.getDate())

	const gridCalendarData = getCalendarContent(calendar, currentSelectedDates)

	return (
		<div
			id="calendar"
			className="mx-auto flex w-fit flex-col gap-2 rounded-md border-2 border-zinc-100 bg-zinc-50 p-4 shadow-lg"
		>
			<div
				id="calendar-header"
				className="flex flex-col items-center gap-2"
			>
				<h4 className="text-sm font-medium text-zinc-400">{year}</h4>
				<div className="flex w-full flex-row items-center justify-between">
					<button
						className="group"
						data-index={monthIndex - 1}
						disabled={
							monthIndex - 1 < currentMonthIndex &&
							year === currentYear
						}
						onClick={handleClickArrow}
					>
						<i
							className={`fa-solid fa-arrow-left p-2 text-2xl text-zinc-700 group-enabled:hover:opacity-50 group-disabled:text-zinc-200`}
						/>
					</button>
					<div className="rounded  px-6 py-2 ">
						<h3 className="text-2xl font-semibold text-zinc-600">
							{monthName}
						</h3>
					</div>

					<button
						className="group"
						data-index={monthIndex + 1}
						onClick={handleClickArrow}
					>
						<i
							className={`fa-solid fa-arrow-right p-2 text-2xl text-zinc-700 hover:opacity-50 group-disabled:text-zinc-200`}
						/>
					</button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-2 ">
				<div className="grid w-full grid-cols-7 items-center justify-items-center gap-1 border-b-2 border-zinc-200 pb-2">
					{getWeekdays().map((weekday, index) => {
						return (
							<button
								onClick={handleClickWeekday}
								key={weekday}
								data-index={index + 1}
								className="flex size-10 items-center justify-center rounded-md border-2 border-transparent bg-zinc-100 font-medium text-zinc-600 hover:cursor-pointer hover:bg-zinc-200"
							>
								{weekday}
							</button>
						)
					})}
				</div>

				<div className="grid w-full grid-cols-7 items-center justify-items-center gap-1 ">
					{gridCalendarData.map((data, index) => {
						const { content, type } = data

						const isDisabled = ["empty", "unavailable"].includes(
							type
						)

						return (
							<button
								onClick={() => handleClickDate(content)}
								key={index}
								data-type={type}
								className="flex size-10 items-center justify-center rounded-md bg-zinc-100 font-medium enabled:hover:bg-zinc-200 disabled:text-zinc-300 data-[type=selected]:border-zinc-200 data-[type=selected]:bg-zinc-900 data-[type=selected]:font-medium data-[type=selected]:text-zinc-50 data-[type=selected]:hover:bg-zinc-500"
								disabled={isDisabled}
								data-date={isDisabled ? null : content}
							>
								{content}
							</button>
						)
					})}
				</div>
			</div>

			<div className="mt-4 flex flex-row items-center justify-between">
				<button
					onClick={handleClickReset}
					className="font-medium text-red-600 hover:underline-offset-4 hover:opacity-50 enabled:hover:underline disabled:opacity-30"
					disabled={selectedDates.length === 0}
				>
					Reset dates
				</button>
				<button
					className="min-w-[150px] rounded bg-zinc-900 px-6 py-2 font-semibold text-zinc-50 hover:opacity-50 disabled:opacity-30"
					onClick={onClick}
					disabled={selectedDates.length === 0}
				>
					Done
				</button>
			</div>
		</div>
	)
}
