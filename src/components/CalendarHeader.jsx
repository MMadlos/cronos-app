function CalendarHeader({ month }) {
	return (
		<div
			id="month-selector"
			className="flex flex-row justify-between items-center ">
			<i className="fa-solid fa-arrow-left text-3xl text-indigo-500" />
			<p className="text-3xl font-semibold text-indigo-700">{month}</p>
			<i className="fa-solid fa-arrow-right text-3xl text-indigo-500" />
		</div>
	)
}

export default CalendarHeader
