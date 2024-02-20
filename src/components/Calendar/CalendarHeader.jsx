function CalendarHeader({ onClick, calendarData, children }) {
	const { year, monthIndex, monthName } = calendarData

	return (
		<div id="calendar-header" className="flex flex-col items-center gap-2">
			{children}
			<h4 className="text-sm font-medium text-zinc-400">{year}</h4>
			<div className="flex w-full flex-row items-center justify-between">
				<MonthArrow
					orientation="left"
					onClick={onClick}
					monthIndex={monthIndex}
				/>
				<button className="rounded bg-zinc-100 px-6 py-2 hover:bg-zinc-200">
					<h3 className="text-2xl font-semibold text-zinc-600">
						{monthName}
					</h3>
				</button>

				<MonthArrow
					orientation="right"
					onClick={onClick}
					monthIndex={monthIndex}
				/>
			</div>
		</div>
	)
}

function MonthArrow({ orientation, onClick, monthIndex }) {
	const currentDate = new Date()
	const currentMonthIndex = currentDate.getMonth()
	const newMonthIndex =
		orientation === "left" ? monthIndex - 1 : monthIndex + 1

	const isDisabled = newMonthIndex < currentMonthIndex

	return (
		<button
			className="group"
			onClick={onClick}
			data-index={newMonthIndex}
			disabled={isDisabled}
		>
			<IconArrow orientation={orientation} />
		</button>
	)
}

function IconArrow({ orientation }) {
	return (
		<i
			className={`fa-solid fa-arrow-${orientation} p-2 text-2xl text-zinc-700  group-enabled:hover:opacity-50 group-disabled:text-zinc-200`}
		/>
	)
}

export default CalendarHeader
