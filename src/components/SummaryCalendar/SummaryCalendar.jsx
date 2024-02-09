import {
	getIntlMonthShort,
	getWeekdays,
	getMonthGridContent,
	getIntlMonthLong,
} from "../../utils"

export default function SummaryCalendar({ selectedDays }) {
	// Recoger los meses que se han seleccionado
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

	console.log(selectedDatesByMonth)
	console.log(monthNames)

	// Mostrar fechas a seleccionar
	// Recoger fechas seleccionadas por los participantes
	// Recoger número total de participantes
	// Recoger, para cada día, cuántos participantes las han seleccionado
	// Mostrar en escala de semáforo las fechas seleccionadas

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
												<span className="">{day}</span>
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
