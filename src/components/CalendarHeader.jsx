function CalendarHeader({ calendarData, onClick }) {
	const { year, month, monthIndex } = calendarData

	return (
		<div
			id="calendar-header"
			className="flex flex-col items-center gap-2">
			<span className="text-zinc-300 text-sm font-medium">{year}</span>
			<div className="flex flex-row justify-between items-center w-full">
				<MonthArrow
					orientation={"left"}
					onClick={onClick}
					monthIndex={monthIndex}
				/>
				<Month
					year={year}
					month={month}
				/>
				<MonthArrow
					orientation={"right"}
					onClick={onClick}
					monthIndex={monthIndex}
				/>
			</div>
		</div>
	)
}

function MonthArrow({ orientation, onClick, monthIndex }) {
	const dataIndex = orientation === "left" ? monthIndex - 1 : monthIndex + 1

	const currentDate = new Date()
	const currentMonthIndex = currentDate.getMonth()
	const isSameMonth = currentMonthIndex === monthIndex
	const isDisabled = isSameMonth && orientation === "left"

	const classes = {
		icon: `fa-solid fa-arrow-${orientation}`,
		base: "text-3xl",
		isDisabled: {
			true: "cursor-default text-zinc-200",
			false: "text-zinc-500 hover:text-blue-600",
		},
	}

	return (
		<button
			onClick={!isDisabled && onClick}
			data-index={dataIndex}>
			<i className={`${classes.icon} ${classes.base} ${classes.isDisabled[isDisabled]}`} />
		</button>
	)
}

function Month({ month }) {
	return (
		<button className="px-6 py-2 bg-zinc-100 hover:bg-zinc-200 rounded">
			<p className="text-3xl font-semibold text-zinc-600">{month}</p>
		</button>
	)
}

export default CalendarHeader
