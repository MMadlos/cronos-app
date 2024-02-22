import { useContext, useState, useEffect } from "react"
import { ConfirmedDataContext } from "../../App"
import TableData from "./TableData"

export default function TableBody({ peopleList, selectedDates }) {
	// const { confirmedData, setConfirmedData } = useContext(ConfirmedDataContext)
	const [confirmed, setConfirmed] = useState([])

	function handleConfirmArray(id, dateTime) {
		const isIncluded =
			confirmed.find(
				(data) => data.id === id && data.dateTime === dateTime
			) !== undefined

		if (!isIncluded) setConfirmed((prev) => [...prev, { id, dateTime }])
		if (isIncluded) {
			const dataToRemove = confirmed.find(
				(data) => data.id === id && data.dateTime === dateTime
			)
			const newConfirmedArray = confirmed.filter(
				(data) => data !== dataToRemove
			)
			setConfirmed(newConfirmedArray)
		}
	}

	return (
		<tbody>
			{peopleList.map(({ id, name }) => {
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
										handleConfirmArray(id, dateTime)
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
