import { useContext, useState, useEffect } from "react"
import { ConfirmedDataContext } from "../../App"

export default function TableData({ dateTime, participantID }) {
	const { confirmedData, setConfirmedData } = useContext(ConfirmedDataContext)

	const [isSelected, setIsSelected] = useState(false)

	useEffect(() => {
		const matchData = confirmedData
			.filter((data) => data.dateTime === dateTime)
			.filter((data) => data.participant === participantID)

		if (matchData.length !== 0) setIsSelected(true)
	}, [])

	function handleConfirmation(isSelected) {
		const currentData = { dateTime, participant: participantID }

		if (isSelected) setConfirmedData((prev) => [...prev, currentData])
		if (!isSelected) {
			const [matchData] = confirmedData
				.filter((data) => data.dateTime === dateTime)
				.filter((data) => data.participant === participantID)

			const newConfirmedData = confirmedData.filter(
				(data) => data !== matchData
			)

			setConfirmedData(newConfirmedData)
		}
	}

	function handleOnClick() {
		setIsSelected(!isSelected)
		handleConfirmation(!isSelected)
	}

	return (
		<td
			colSpan="1"
			rowSpan="1"
			headers={`${dateTime} ${participantID}`}
			className="text-center"
		>
			<div className="flex h-[35px] w-full items-center justify-center">
				<button
					onClick={handleOnClick}
					data-selected={isSelected}
					className="w-full text-2xl text-zinc-200 hover:text-zinc-300 data-[selected=true]:text-green-500 data-[selected=true]:hover:text-green-300"
				>
					<i className="fa-solid fa-circle-check " />
				</button>
			</div>
		</td>
	)
}

// function TableButton({isSelected, onClick, className}) {
// 	return (
// 		<button
// 					onClick={onClick}
// 					data-status={isSelected ? "Confirmed" : "Unknown"}
// 					className={className}
// 				>
// 					{isSelected ? (
// 						<i className="fa-solid fa-circle-check text-2xl  text-green-500 hover:text-green-300" />
// 					) : (
// 						<i className="fa-solid fa-circle text-2xl text-zinc-200 hover:text-zinc-300" />
// 					)}
// 				</button>
// 	)
// }
