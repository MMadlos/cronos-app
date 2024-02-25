import { useContext, useState } from "react"
import { ParticipantsContext, SelectedDatesContext } from "../../App"
import TableData from "./TableData"

export default function TableBody({ confirmed, onClickData }) {
	const { participants } = useContext(ParticipantsContext)
	const { selectedDates } = useContext(SelectedDatesContext)

	return (
		<tbody>
			{participants.map(({ id, name }) => {
				return (
					<tr key={id}>
						<th id={id} headers="participants">
							{name}
						</th>
						{selectedDates.map((dateTime) => {
							const isSelected =
								confirmed.find(
									(data) =>
										data.id === id &&
										data.dateTime === dateTime
								) !== undefined

							return (
								<TableData
									key={`${id}-${dateTime}`}
									headers={`${dateTime} ${id}`}
									isSelected={isSelected}
									onClick={() => {
										onClickData(id, dateTime)
									}}
								/>
							)
						})}
						<td></td>
					</tr>
				)
			})}
		</tbody>
	)
}
