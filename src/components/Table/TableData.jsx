import { useState } from "react"

const btnStates = ["Unknown", "Confirmed"]

export default function TableData({ thID }) {
	const [state, setState] = useState(btnStates[0])

	function handleState(e) {
		const currentState = e.target.closest("button").dataset.status
		const currentStateIndex = btnStates.indexOf(currentState)

		const newIndex =
			currentStateIndex >= btnStates.length - 1
				? 0
				: currentStateIndex + 1
		setState(btnStates[newIndex])
	}

	return (
		<td colSpan="1" rowSpan="1" headers={thID} className="text-center">
			<button className="group" onClick={handleState} data-status={state}>
				<i className="fa-solid fa-circle text-4xl  text-zinc-200  group-data-[status=Confirmed]:text-green-300" />
			</button>
		</td>
	)
}
