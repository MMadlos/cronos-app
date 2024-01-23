function CalendarHeader({ calendarData, onClick }) {
	const { year, month, monthIndex } = calendarData

	return (
		<div
			id="calendar-header"
			className="flex flex-row justify-between items-center ">
			<button
				onClick={onClick}
				data-index={monthIndex - 1}>
				<i className="fa-solid fa-arrow-left text-3xl text-indigo-500" />
			</button>
			<div className="flex flex-col items-center justify-center">
				<span className="text-indigo-300 text-sm font-medium">{year}</span>
				<p className="text-3xl font-semibold text-indigo-700">{month}</p>
			</div>
			<button
				onClick={onClick}
				data-index={monthIndex + 1}>
				<i className="fa-solid fa-arrow-right text-3xl text-indigo-500" />
			</button>
		</div>
	)
}

export default CalendarHeader
