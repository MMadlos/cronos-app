import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"

export default function TableHead({ selectedDates }) {
	const sortedByMonth = {}
	selectedDates.forEach((object) => {
		const month = getIntlMonthLong(object)
		const weekday = getIntlWeekdayShort(object)
		const date = object.getDate()

		if (sortedByMonth[month] === undefined) sortedByMonth[month] = []
		sortedByMonth[month].push({ weekday, date })
	})

	const tableCount = {
		monthCount: Object.keys(sortedByMonth).length,
	}

	for (let month in sortedByMonth) {
		tableCount[month] = sortedByMonth[month].length
	}

	const allMonths = Object.keys(sortedByMonth)
	const allDates = Object.values(sortedByMonth).flat()

	return (
		<thead>
			<tr>
				<th id="empty-th"></th>
				{allMonths.map((month, index) => {
					const colSpan = tableCount[month]

					return (
						<th key={index} id={index} colSpan={colSpan}>
							{month}
						</th>
					)
				})}
				<th></th>
			</tr>
			<tr>
				<th id="participants">Participantes</th>
				{allDates.map((dates, index) => {
					const { weekday, date } = dates

					return (
						<th key={index} id={index}>
							{`${weekday} ${date}`}
						</th>
					)
				})}
				<th></th>
			</tr>
		</thead>
	)
}
