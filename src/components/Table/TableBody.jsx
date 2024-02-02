import TableData from "./TableData"

export default function TableBody({ peopleList, selectedDates }) {
	return (
		<tbody>
			{peopleList.map((peopleData) => {
				const { id, name } = peopleData

				return (
					<tr key={id}>
						<th id={id} headers="participants">
							{name}
						</th>
						{selectedDates.map((dates) => {
							const dateTime = dates.getTime()

							return (
								<TableData
									key={dateTime}
									thID={`${dateTime} ${id}`}
								/>
							)
						})}
					</tr>
				)
			})}
		</tbody>
	)
}
