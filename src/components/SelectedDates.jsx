import { getIntlMonthShort, getIntlWeekdayShort } from "../utils"

function SelectedDates({ dates }) {
	return (
		<div className="flex flex-col gap-4 bg-indigo-50 p-4 ">
			<p className="text-indigo-300">Selected days</p>
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
		</div>
	)
}

export default SelectedDates
