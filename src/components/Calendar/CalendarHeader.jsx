import { getIntlMonthLong } from "../../utils"

function CalendarHeader({ calendarData, onClick }) {
	const { year, monthIndex } = calendarData

	const date = new Date(year, monthIndex, 1)
	const month = getIntlMonthLong(date)

	return (
		<div id="calendar-header" className="flex flex-col items-center gap-2">
			<span className="text-sm font-medium text-zinc-300">{year}</span>
			<div className="flex w-full flex-row items-center justify-between">
				<MonthArrow
					orientation={"left"}
					onClick={onClick}
					monthIndex={monthIndex}
				/>
				<button className="rounded bg-zinc-100 px-6 py-2 hover:bg-zinc-200">
					<p className="text-3xl font-semibold text-zinc-600">
						{month}
					</p>
				</button>

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
		<button onClick={!isDisabled && onClick} data-index={dataIndex}>
			<i
				className={`${classes.icon} ${classes.base} ${classes.isDisabled[isDisabled]}`}
			/>
		</button>
	)
}

export default CalendarHeader
