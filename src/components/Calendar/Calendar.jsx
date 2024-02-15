import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

// Qué necesito del calendario:
/*
	- dateNow = new Date()
	- date.getMonth()
	- date.getDate()
	- date.getDay()

	- getIntlMonthLong
	- getIntlWeekdayShort
	- Gestión flechas
	- Primer día del mes
	- Num total de día del mes


	- Fechas pasadas a hoy
	- Fechas seleccionadas
*/

function Calendar({
	calendarData,
	selectedDays,
	onClickDate,
	onClickWeekday,
	onClickArrows,
	onClickReset,
	onClickDone,
}) {
	return (
		<div
			id="calendar"
			className="mx-auto flex w-fit flex-col gap-2 rounded-md border-2 border-zinc-100 bg-zinc-50 p-4 shadow-lg "
		>
			<CalendarHeader onClick={onClickArrows} />
			<CalendarBody
				calendarData={calendarData}
				selectedDates={selectedDays}
				onClickDate={onClickDate}
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
