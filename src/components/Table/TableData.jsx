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
				<button onClick={handleState} data-status={state}>
					{state === btnStates[0] ? (
						<i className="fa-solid fa-circle text-3xl text-zinc-200 hover:text-zinc-300" />
					) : (
						<i className="fa-solid fa-circle-check text-3xl  text-green-500 hover:text-green-300" />
					)}
				</button>
			</div>
		</td>
	)
}
