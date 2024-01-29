function CalendarCell({ date, onClickDate, monthIndex, filteredDates }) {
	const dateToday = new Date()

	const isPastDate =
		date < dateToday.getDate() && monthIndex === dateToday.getMonth()

	const isSelected = filteredDates.includes(date)

	const isToday =
		date === dateToday.getDate() && monthIndex === dateToday.getMonth()

	const classes = {
		base: "flex justify-center rounded-md font-medium items-center size-12 border-2",
		isEmpty: "bg-zinc-100 border-zinc-100",
		notAvailable: "bg-zinc-100 border-zinc-100 text-zinc-300",
		isToday: "bg-zinc-50 border-zinc-500 text-zinc-700 hover:bg-zinc-200",
		isSelected: "bg-zinc-900 border-zinc-900 text-zinc-50 font-medium",
		default: "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-200",
	}

	const getClasses = () => {
		if (date === undefined) return classes.isEmpty
		if (isPastDate) return classes.notAvailable
		if (isSelected) return classes.isSelected
		if (isToday) return classes.isToday
		return classes.default
	}

	const classType = getClasses()

	return (
		<button
			className={`${classes.base} ${classType}`}
			data-date={date}
			onClick={onClickDate}
			data-selected={isSelected}
		>
			{date}
		</button>
	)
}

export default CalendarCell
