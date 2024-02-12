import { getMonthGridContent, getWeekdays } from "../../utils"
import SummaryCalendarCell from "./SummaryCalendarCell"

export default function SummaryCalendarGrid({ monthData }) {
	const { monthIndex, selectedDates } = monthData

	const monthGridContent = getMonthGridContent(2024, monthIndex)
	const weekDays = getWeekdays()

	const calendarGrid = [...weekDays, ...monthGridContent]

	const allSelectedDates = selectedDates.map((data) => data.date)

	function getRatioType(day) {
		const [dateRatio] = selectedDates
			.filter((datesData) => datesData.date === day)
			.map((datesData) => datesData.ratio)
			.flat()

		const ratioType =
			dateRatio === 1 ? "all" : dateRatio > 0 ? "partial" : "none"

		return ratioType
	}

	return (
		<div className="grid grid-cols-7">
			{calendarGrid.map((day, index) => {
				const isSelected = allSelectedDates.includes(day)
				const ratioType = isSelected ? getRatioType(day) : null

				return (
					<SummaryCalendarCell
						key={index}
						day={day}
						isSelected={isSelected}
						ratioType={ratioType}
					/>
				)
			})}
		</div>
	)
}
