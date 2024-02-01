import { getFormattedDates } from "../../utils"

export default function TableHead({ selectedDates }) {
	const formattedDates = getFormattedDates(selectedDates)

	return (
		<thead>
			<tr>
				<th id="participants"></th>
				{formattedDates.map((dates, index) => {
					const dateTime = selectedDates[index].getTime()

					return (
						<th key={dateTime} id={dateTime}>
							{dates}
						</th>
					)
				})}
			</tr>
		</thead>
	)
}
