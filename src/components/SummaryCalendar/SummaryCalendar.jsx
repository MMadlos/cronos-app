import {
	getIntlMonthShort,
	getWeekdays,
	getMonthGridContent,
	getIntlMonthLong,
} from "../../utils"

import { useContext, useEffect } from "react"
import { SummaryDataContext } from "../../App"

export default function SummaryCalendar({ selectedDays, totalparticipants }) {
	const { summaryData, setSummaryData } = useContext(SummaryDataContext)

	const selectedDaysByMonth = {}
	selectedDays.forEach((date) => {
		const monthName = getIntlMonthLong(date)
		const _date = date.getDate()

		if (selectedDaysByMonth[monthName] === undefined)
			selectedDaysByMonth[monthName] = []

		selectedDaysByMonth[monthName].push(_date)
	})

	const weekDays = getWeekdays()

	return (
		<div className="p-4">
			<div
				id="summary-calendar"
				className="flex min-h-[200px] w-full flex-col gap-4 rounded-md border-2 border-zinc-800 bg-white p-2"
			>
				{summaryData.map((monthData) => {
					const { monthName, monthIndex } = monthData

					const monthGridContent = getMonthGridContent(
						2024,
						monthIndex
					)
					const calendarGrid = [...weekDays, ...monthGridContent]

					return (
						<div key={monthName} className="border border-blue-500">
							<h3 className="text-center">{monthName}</h3>
							<div className="grid grid-cols-7">
								{calendarGrid.map((day, index) => {
									let isSelected = false
									let ratio = "none"

									if (typeof day === "number") {
										isSelected =
											selectedDaysByMonth[
												monthName
											].includes(day)

										const [dateObject] =
											monthData.selectedDates.filter(
												(dataObject) =>
													dataObject.date === day
											)

										if (dateObject !== undefined) {
											const _ratio = dateObject.ratio
											ratio =
												_ratio === 1
													? "all"
													: _ratio > 0
														? "partial"
														: "none"
										}
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
