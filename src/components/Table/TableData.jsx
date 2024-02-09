import { useState, useContext } from "react"
import { ConfirmedDatesContext } from "../../App"

const btnStates = ["Unknown", "Confirmed"]

export default function TableData({ thID }) {
	const [state, setState] = useState(btnStates[0])
	const { confirmedDates, setConfirmedDates } = useContext(
		ConfirmedDatesContext
	)

	function handleOnClick(e) {
		const newState = getNewState(e)
		const newConfirmedDates = getNewConfirmedDates(newState)

		setState(newState)
		setConfirmedDates(newConfirmedDates)
	}

	function getNewState(e) {
		const currentState = e.target.closest("button").dataset.status
		const newState = currentState === "Confirmed" ? "Unknown" : "Confirmed"
		return newState
	}

	function getNewConfirmedDates(state) {
		const headersData = thID.split(" ")
		const [dateTime, id] = headersData

		const isConfirmed = state === "Confirmed"
		const newConfirmedDates = confirmedDates
		const newDatesArray = newConfirmedDates[dateTime].filter(
			(userID) => userID !== id
		)

		isConfirmed
			? newConfirmedDates[dateTime].push(id)
			: (newConfirmedDates[dateTime] = newDatesArray)

		return newConfirmedDates
	}

	return (
		<td colSpan="1" rowSpan="1" headers={thID} className="text-center">
			<div className="flex h-[35px] w-full items-center justify-center">
				<button onClick={handleOnClick} data-status={state}>
					{state === btnStates[0] ? (
						<i className="fa-solid fa-circle text-2xl text-zinc-200 hover:text-zinc-300" />
					) : (
						<i className="fa-solid fa-circle-check text-2xl  text-green-500 hover:text-green-300" />
					)}
				</button>
			</div>
		</td>
	)
}
