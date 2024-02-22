import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"
import Modal from "../Modals/Modal"
import UserList from "../UserList/UserList"
import DatePicker from "../Calendar/DatePicker"

export default function TableHead({ selectedDates }) {
	const allMonths = []
	const allDatesData = []
	const datesCountByMonth = { total: 0 }

	selectedDates.forEach((dateTime) => {
		const dateData = new Date(dateTime)
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
		<thead className="">
			<tr className="">
				<th className="p-1">
					<Modal buttonName="Participants" useCase="UserList" />
				</th>
				<th colSpan={datesCountByMonth.total} className="p-1">
					<Modal buttonName="Dates" useCase="DatePicker" />
				</th>
				<th></th>
			</tr>
			<tr>
				<th></th>
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
				<th></th>
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
