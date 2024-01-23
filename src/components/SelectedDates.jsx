import { getIntlMonthShort, getIntlWeekdayShort } from "../utils"

function SelectedDates({ dates }) {
	return (
		<div className="flex gap-4">
			{dates.map((dayObj, index) => {
				const month = getIntlMonthShort(dayObj)
				const weekday = getIntlWeekdayShort(dayObj)
				const date = dayObj.getDate()

				return (
					<div key={index}>
						<p>{month}</p>
						<p>{weekday}</p>
						<p>{date}</p>
					</div>
				)
			})}
		</div>
	)
}

export default SelectedDates
