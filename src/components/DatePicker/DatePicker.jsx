import { useState, useContext } from "react"
import { SelectedDatesContext } from "../../App"

import {
	getAllSelectedWeekdayDates,
	getCalendarContent,
	getWeekdays,
} from "../../utils"
import DatePickerHeader from "./DatePickerHeader"
import DateButton from "./DateButton"

const dateNow = new Date()
const yearNow = dateNow.getFullYear()
const monthIndexNow = dateNow.getMonth()
const initCalendar = {
	year: yearNow,
	monthIndex: monthIndexNow,
}

// AHORA, CUANDO SE HACE CLICK EN LA FECHA, SE AÑADE A selectedDates.
// QUIERO QUE: NO SE AÑADA A SELECTED_DATES HASTA QUE SE HAGA CLICK EN HECHO.

// Guardar temporalmente las fechas seleccionadas
// Actualizar selectedDates con las fechas actualizadas.

export default function DatePicker({ onClick }) {
	const [calendar, setCalendar] = useState(initCalendar)
	const { selectedDates, setSelectedDates } = useContext(SelectedDatesContext)

	const [currentDates, setCurrentDates] = useState(selectedDates)

	const { year, monthIndex } = calendar

	function handleClickArrow(e) {
		const monthIndex = Number(e.target.closest("button").dataset.index)

		const date = new Date(dateNow.getTime())
		date.setMonth(monthIndex)

		const year = date.getFullYear()

		setCalendar({ year, monthIndex })
	}

	function handleClickDate(dataDate) {
		const newDate = new Date(year, monthIndex, dataDate)
		const newDateTime = newDate.getTime()

		const isSelected = selectedDates.includes(newDateTime)

		if (!isSelected)
			setSelectedDates((prev) => [...prev, newDateTime].sort())

		if (isSelected) {
			const newSelectedDates = selectedDates
				.filter((date) => date !== newDateTime)
				.sort()
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

	const gridCalendarData = getCalendarContent(calendar, selectedDates)

	// STEPS: Si hago click,

	return (
		<div
			id="calendar"
			className="mx-auto flex h-fit w-fit flex-col gap-2 rounded-md  bg-white p-4 shadow-md "
		>
			<DatePickerHeader
				calendar={calendar}
				onClickArrow={handleClickArrow}
			/>

			<div className="flex flex-col items-center justify-center gap-2 ">
				<div className="grid w-full grid-cols-7 items-center justify-items-center gap-1 border-b-2 border-stone-200 pb-2">
					{getWeekdays().map((weekday, index) => {
						return (
							<button
								onClick={handleClickWeekday}
								key={weekday}
								data-index={index + 1}
								className="flex size-10 items-center justify-center rounded-md border-2 border-transparent bg-stone-50 font-medium text-stone-600 hover:cursor-pointer hover:bg-stone-200 sm:bg-stone-100"
							>
								{weekday}
							</button>
						)
					})}
				</div>

				<div className="grid w-full grid-cols-7 items-center justify-items-center gap-1 ">
					{gridCalendarData.map((data, index) => {
						return (
							<DateButton
								key={index}
								data={data}
								onClick={() => handleClickDate(data.content)}
							/>
						)
					})}
				</div>
			</div>

			<div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex">
				<button
					onClick={handleClickReset}
					className="px-6 py-2 font-medium text-red-600 hover:underline-offset-4 hover:opacity-50 enabled:hover:underline disabled:opacity-30"
					disabled={selectedDates.length === 0}
				>
					Deseleccionar todo
				</button>
				<button
					className="w-full rounded bg-stone-800 px-6 py-2 font-semibold text-stone-50 hover:opacity-50 disabled:opacity-30"
					onClick={onClick}
					disabled={selectedDates.length === 0}
				>
					Hecho
				</button>
			</div>
		</div>
	)
}
