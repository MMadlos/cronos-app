import {
	getIntlMonthShort,
	getWeekdays,
	getMonthGridContent,
	getIntlMonthLong,
} from "../../utils"

import { useContext, useEffect } from "react"
import { ConfirmedDatesContext } from "../../App"

/*
const confirmedData = {
	february: [
		{
		date: date,
		numConfirmed: count people,
		ratio: numConfirmed / total, 
		}
	]
}

TODO - Transformar el antiguo selectedDates a este ConfirmedDates
const confirmedData = {
	february: {
		monthIndex: 1,
		selectedDates: [
			{date, ratio, confirmedList}
			{date, ratio, confirmedList}
		]
	},
	march: {
		monthIndex: 2,
		selectedDates: [
			{date, ratio, confirmedList}
			{date, ratio, confirmedList}
		]
	}
}
*/

export default function SummaryCalendar({ selectedDays, totalparticipants }) {
	// Recoger los meses que se han seleccionado
	const { confirmedDates } = useContext(ConfirmedDatesContext)

	const confirmedData = {}
	for (let dateTime of Object.keys(confirmedDates)) {
		const dateObject = new Date()
		dateObject.setTime(dateTime)

		const monthName = getIntlMonthLong(dateObject)
		if (confirmedData[monthName] === undefined)
			confirmedData[monthName] = []

		const date = dateObject.getDate()
		const numConfirmed = confirmedDates[dateTime].length
		const ratio = numConfirmed / totalparticipants
		const data = { date, numConfirmed, ratio }

		confirmedData[monthName].push(data)
	}

	const selectedDatesByMonth = {}
	selectedDays.forEach((date) => {
		const monthName = getIntlMonthLong(date)
		const isIncluded = selectedDatesByMonth[monthName] !== undefined

		if (!isIncluded) {
			selectedDatesByMonth[monthName] = {
				dates: [],
				monthIndex: date.getMonth(),
			}
		}
		selectedDatesByMonth[monthName].dates.push(date.getDate())
	})

	const monthNames = Object.keys(selectedDatesByMonth)

	// Encontrar qué fechas coinciden entre confirmedData y selectedDatesByMonth

	// Objetivo:
	// Si coinciden en mes y fecha, revisar el porcentaje (ratio).
	// Si ratio = 0 -> Círculo gris
	// Si ratio = 1 -> Círculo verde
	// Si ratio entre 0 y 1 -> Círculo amarillo

	// CALENDARIO
	// Columnas: 7 / Rows: 6 / Celdas totales: 42
	const weekDays = getWeekdays()

	return (
		<div className="p-4">
			<div
				id="summary-calendar"
				className="flex min-h-[200px] w-full flex-col gap-4 rounded-md border-2 border-zinc-800 bg-white p-2"
			>
				{monthNames.map((monthName, index) => {
					const monthGridContent = getMonthGridContent(
						2024,
						selectedDatesByMonth[monthName].monthIndex
					)
					const calendarGrid = [...weekDays, ...monthGridContent]

					return (
						<div key={monthName} className="border border-blue-500">
							<h3 className="text-center">{monthName}</h3>
							<div className="grid grid-cols-7">
								{calendarGrid.map((day, index) => {
									const selectedDates =
										selectedDatesByMonth[monthName].dates
									const isSelected =
										selectedDates.includes(day)

									return (
										<div
											key={index}
											className="border text-center"
										>
											{isSelected ? (
												<span className="bg-green-300">
													{day}
												</span>
											) : (
												<span className="text-zinc-400">
													{day}
												</span>
											)}
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>

			<SelectedDaysObserver selectedDays={selectedDays} />
		</div>
	)
}

function SelectedDaysObserver({ selectedDays }) {
	return (
		<div className="mt-4">
			<p>Console.log</p>
			{selectedDays.map((dates, index) => {
				const month = getIntlMonthShort(dates)
				const date = dates.getDate()

				return <p key={index}>{`${month} - ${date}`}</p>
			})}
		</div>
	)
}
