import {
	getIntlMonthShort,
	getWeekdays,
	getMonthGridContent,
	getIntlMonthLong,
} from "../../utils"

export default function SummaryCalendar({ selectedDays }) {
	// Recoger los meses que se han seleccionado
	const monthIndexes = []
	const monthNames = []
	selectedDays.forEach((date) => {
		const monthIndex = date.getMonth()
		if (monthIndexes.includes(monthIndex)) return
		monthIndexes.push(monthIndex)

		const monthName = getIntlMonthLong(date)
		monthNames.push(monthName)
	})

	// Mostrar fechas a seleccionar
	// Recoger fechas seleccionadas por los participantes
	// Recoger número total de participantes
	// Recoger, para cada día, cuántos participantes las han seleccionado
	// Mostrar en escala de semáforo las fechas seleccionadas

	// CALENDARIO
	// Columnas: 7 / Rows: 6 / Celdas totales: 42
	const weekDays = getWeekdays()
	const monthGridContent = getMonthGridContent(2024, monthIndexes[0])
	const calendarGrid = [...weekDays, ...monthGridContent]

	return (
		<div>
			<p>3</p>
			<div
				id="summary-calendar"
				className="min-h-[200px] w-full rounded-md bg-white p-2"
			>
				<div className="border border-blue-500">
					<h3 className="text-center">{`${monthNames[0]}`}</h3>
					<div className="grid grid-cols-7">
						{calendarGrid.map((day, index) => {
							return (
								<div key={index} className="border text-center">
									<span className="">{day}</span>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			<SelectedDaysObserver selectedDays={selectedDays} />
		</div>
	)
}

function SelectedDaysObserver({ selectedDays }) {
	return (
		<div className="mt-4">
			<p>Console.log</p>
			{selectedDays.map((dates) => {
				const month = getIntlMonthShort(dates)
				const date = dates.getDate()

				return <p>{`${month} - ${date}`}</p>
			})}
		</div>
	)
}
