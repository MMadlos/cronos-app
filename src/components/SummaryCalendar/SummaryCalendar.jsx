import {
	getIntlMonthShort,
	getWeekdays,
	getMonthGridContent,
	getIntlMonthLong,
} from "../../utils"

export default function SummaryCalendar({ summaryData, selectedDays }) {
	// Test -->
	const selectedDates = summaryData
		.filter((monthData) => monthData.monthIndex === 1)
		.map((data) => data.selectedDates.map((datesData) => datesData.date))
		.flat()

	const dateRatios = summaryData
		.filter((monthData) => monthData.monthIndex === 1)
		.map((data) => data.selectedDates.map((datesData) => datesData.ratio))
		.flat()

	const specificDateRatio = summaryData
		.filter((monthData) => monthData.monthIndex === 1)
		.map((data) =>
			data.selectedDates
				.filter((datesData) => datesData.date === 7)
				.map((datesData) => datesData.ratio)
		)
		.flat()

	// console.log(selectedDates)
	// console.log(dateRatios)
	// console.log(specificDateRatio)

	// <-- Test

	const weekDays = getWeekdays()

	return (
		<div className="p-4">
			<div
				id="summary-calendar"
				className="flex min-h-[200px] w-full flex-col gap-4 rounded-md border-2 border-zinc-800 bg-white p-2"
			>
				{summaryData.map((monthData) => {
					const { monthName, monthIndex, selectedDates } = monthData

					const monthGridContent = getMonthGridContent(
						2024,
						monthIndex
					)
					const calendarGrid = [...weekDays, ...monthGridContent]

					const allSelectedDates = selectedDates.map(
						(data) => data.date
					)

					return (
						<div key={monthName} className="border border-blue-500">
							<h3 className="text-center">{monthName}</h3>
							<div className="grid grid-cols-7">
								{calendarGrid.map((day, index) => {
									let isSelected =
										allSelectedDates.includes(day)

									let ratio

									if (typeof day === "number") {
										const [dateRatio] = selectedDates
											.filter(
												(datesData) =>
													datesData.date === day
											)
											.map((datesData) => datesData.ratio)
											.flat()

										ratio =
											dateRatio === 1
												? "all"
												: dateRatio > 0
													? "partial"
													: "none"
									}

									const classes = {
										all: "bg-green-300",
										partial: "bg-yellow-500",
										none: "bg-zinc-200",
									}

									return (
										<div
											key={index}
											className="border text-center"
										>
											{isSelected ? (
												<span
													className={`font-bold text-zinc-800 ${classes[ratio]}`}
												>
													{day}
												</span>
											) : (
												<span className="text-zinc-400">
													{day}
												</span>
											)}
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>

			<SelectedDaysObserver selectedDays={selectedDays} />
		</div>
	)
}

function SelectedDaysObserver({ selectedDays }) {
	return (
		<div className="mt-4">
			<p>Console.log</p>
			{selectedDays.map((dates, index) => {
				const month = getIntlMonthShort(dates)
				const date = dates.getDate()

				return <p key={index}>{`${month} - ${date}`}</p>
			})}
		</div>
	)
}
