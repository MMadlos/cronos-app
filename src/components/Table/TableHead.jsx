import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"

export default function TableHead({ selectedDates }) {
	const allMonths = []
	const allDatesData = []
	const datesCountByMonth = { total: 0 }

	selectedDates.forEach((dateData) => {
		const monthName = getIntlMonthLong(dateData)
		const weekday = getIntlWeekdayShort(dateData)
		const date = dateData.getDate()
		const time = dateData.getTime()

		if (!allMonths.includes(monthName)) allMonths.push(monthName)

		const datesData = { weekday, date, time }
		allDatesData.push(datesData)

		if (datesCountByMonth[monthName] === undefined)
			datesCountByMonth[monthName] = 0
		datesCountByMonth[monthName]++
		datesCountByMonth.total++
	})

	return (
		<thead>
			<tr>
				<th>Participants</th>
				<th colSpan={datesCountByMonth.total}>Dates</th>
				<th></th>
			</tr>
			<tr>
				<th id="empty-th"></th>
				{allMonths.map((month, index) => {
					const colSpan = datesCountByMonth[month]

					return (
						<th key={index} id={month} colSpan={colSpan}>
							{month}
						</th>
					)
				})}
				<th></th>
			</tr>
			<tr>
				<th id="participants"></th>
				{allDatesData.map(({ weekday, date, time }) => {
					return (
						<th key={time} id={time}>
							{`${weekday} ${date}`}
						</th>
					)
				})}
				<th></th>
			</tr>
		</thead>
	)
}
