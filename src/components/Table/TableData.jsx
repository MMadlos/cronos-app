import { useState, useContext } from "react"
import { ConfirmedDatesContext } from "../../App"

export default function TableData({ thID }) {
	const [state, setState] = useState("Unknown")
	const { confirmedDates, setConfirmedDates } = useContext(
		ConfirmedDatesContext
	)

	function handleOnClick(e) {
		const newState = getNewState(e)
		const newConfirmedDates = getConfirmedDates(newState)

		setState(newState)
		setConfirmedDates(newConfirmedDates)
	}

	function getNewState(e) {
		const currentState = e.target.closest("button").dataset.status
		const newState = currentState === "Confirmed" ? "Unknown" : "Confirmed"
		return newState
	}

	function getConfirmedDates(state) {
		const headersData = thID.split(" ")
		const [dateTime, id] = headersData

		const newDatesArray = confirmedDates[dateTime].filter(
			(userID) => userID !== id
		)

		const isConfirmed = state === "Confirmed"
		if (isConfirmed) newDatesArray.push(id)

		const newConfirmedDates = {
			...confirmedDates,
			[dateTime]: newDatesArray,
		}

		return newConfirmedDates
	}

	return (
		<td colSpan="1" rowSpan="1" headers={thID} className="text-center">
			<div className="flex h-[35px] w-full items-center justify-center">
				<button onClick={handleOnClick} data-status={state}>
					{state === "Unknown" ? (
						<i className="fa-solid fa-circle text-2xl text-zinc-200 hover:text-zinc-300" />
					) : (
						<i className="fa-solid fa-circle-check text-2xl  text-green-500 hover:text-green-300" />
					)}
				</button>
			</div>
		</td>
	)
}
