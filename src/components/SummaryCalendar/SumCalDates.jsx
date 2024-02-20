import { getMonthGridContent, getCalendarContent } from "../../utils"
import SumCalCell from "./SumCalCell"

export default function SumCalDates({ monthData }) {
	const { monthIndex, selectedDates } = monthData
	const monthGridContent = getMonthGridContent(2024, monthIndex)
	const allSelectedDates = selectedDates.map((data) => data.date)

	function getRatio(day) {
		const [dateRatio] = selectedDates
			.filter((datesData) => datesData.date === day)
			.map((datesData) => datesData.ratio)
			.flat()

		return dateRatio
	}

	function getDataType(day) {
		const isSelected = allSelectedDates.includes(day)

		if (!isSelected) return "ns"

		const ratio = getRatio(day)
		const type = ratio === 1 ? "full" : ratio > 0 ? "part" : "none"

		return type
	}

	return (
		<div className="grid grid-cols-7 gap-2 p-1">
			{monthGridContent.map((day, index) => {
				const dataType = getDataType(day)

				return (
					<SumCalCell content={day} key={index} dataType={dataType} />
				)
			})}
		</div>
	)
}
