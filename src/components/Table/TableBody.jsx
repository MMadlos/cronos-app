import TableData from "./TableData"

export default function TableBody({ peopleList, formattedDates }) {
	return (
		<tbody>
			{peopleList.map((peopleData, index) => {
				const { id, name } = peopleData

				return (
					<tr key={index}>
						<th id="id" headers="participants">
							{name}
						</th>
						{formattedDates.map((dates, _index) => {
							const headerDate = dates.split(" ").join("-")
							return <TableData thID={`${headerDate} ${id}`} />
						})}
					</tr>
				)
			})}
		</tbody>
	)
}
