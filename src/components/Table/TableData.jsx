import { useState, useContext, useEffect } from "react"
import { ConfirmedDatesContext } from "../../App"

export default function TableData({ dateTime, participantID }) {
	const { confirmedDates, setConfirmedDates } = useContext(
		ConfirmedDatesContext
	)

	const [isSelected, setIsSelected] = useState(false)

	// TODO - isSelected se debe actualizar de confirmedDates,
	useEffect(() => {
		if (confirmedDates[`${dateTime}`] !== undefined) {
			const isConfirmed = confirmedDates[dateTime].includes(participantID)
			if (isConfirmed) setIsSelected(true)
			if (!isConfirmed) setIsSelected(false)
		}
	}, [confirmedDates])

	function handleOnClick() {
		const confirmedArray = confirmedDates[`${dateTime}`].filter(
			(IDs) => IDs !== participantID
		)

		if (!isSelected) confirmedArray.push(participantID)

		const newConfirmedDates = {
			...confirmedDates,
			[`${dateTime}`]: confirmedArray,
		}

		setConfirmedDates(newConfirmedDates)
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
					data-status={isSelected ? "Confirmed" : "Unknown"}
				>
					{isSelected ? (
						<i className="fa-solid fa-circle-check text-2xl  text-green-500 hover:text-green-300" />
					) : (
						<i className="fa-solid fa-circle text-2xl text-zinc-200 hover:text-zinc-300" />
					)}
				</button>
			</div>
		</td>
	)
}
