function CalendarCell({ date, onClickDate, dataType }) {
	const classes = {
		base: "flex justify-center rounded-md font-medium items-center size-10 border-2",
		empty: "bg-zinc-100 border-zinc-100",
		unavailable: "bg-zinc-100 border-zinc-100 text-zinc-300",
		today: "bg-zinc-50 border-zinc-500 text-zinc-700 hover:bg-zinc-200",
		selected: "bg-zinc-900 border-zinc-900 text-zinc-50 font-medium",
		default: "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-200",
	}

	return (
		<button
			className={`${classes.base} ${classes[dataType]}`}
			data-date={date}
			onClick={onClickDate}
			data-type={dataType}
		>
			{date}
		</button>
	)
}

export default CalendarCell
