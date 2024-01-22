function CalendarHeader({ month }) {
	return (
		<div
			id="month-selector"
			className="flex flex-row justify-between items-center ">
			<i className="fa-solid fa-arrow-left text-3xl text-indigo-500" />
			<div className="flex flex-col items-center justify-center">
				<span className="text-indigo-300 text-sm font-medium">2024</span>
				<p className="text-3xl font-semibold text-indigo-700">{month}</p>
			</div>
			<i className="fa-solid fa-arrow-right text-3xl text-indigo-500" />
		</div>
	)
}

export default CalendarHeader
