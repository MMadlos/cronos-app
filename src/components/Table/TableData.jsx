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
			<div className="flex h-[35px] w-full items-center justify-center">
				<button
					className="h-[25px] w-[75px]  rounded-md bg-zinc-300 data-[status=Confirmed]:bg-green-300"
					onClick={handleState}
					data-status={state}
				></button>
			</div>
		</td>
	)
}
