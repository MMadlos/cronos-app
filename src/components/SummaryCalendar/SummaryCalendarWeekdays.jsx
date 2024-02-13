import { getWeekdays } from "../../utils"
import SumCalCell from "./SumCalCell"

export default function SummaryCalendarWeekdays() {
	const weekDays = getWeekdays()

	return (
		<div className="grid grid-cols-7 gap-2 rounded-md  bg-zinc-50 p-1">
			{weekDays.map((weekday, index) => {
				return (
					<SumCalCell
						content={weekday}
						key={index}
						dataType="weekday"
					/>
				)
			})}
		</div>
	)
}
