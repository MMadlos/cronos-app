import { useState } from "react"

export default function UserList() {
	const [participants, setParticipants] = useState(
		["Test 1", "Test 2", "Test 3"].sort()
	)

	const [inputValue, setInputValue] = useState("")

	function handleChangeInput(e) {
		setInputValue(e.target.value)
	}

	function handleAddParticipants(e) {
		// TODO - Add message for empty input
		if (inputValue === "") return

		if (e.key === "Enter" || e.type === "click") {
			setParticipants((prev) => [...prev, inputValue])
			setInputValue("")
		}
	}

	function onClickRemove(e) {
		const userIndex = Number(e.target.closest("button").dataset.index)
		const list = participants.filter((_, index) => index !== userIndex)
		setParticipants(list)
	}

	return (
		<div className="flex h-[70vh] min-w-[40vw] flex-col gap-6 rounded-xl bg-zinc-50 p-8 shadow-md">
			<h2 className="text-lg font-medium">Participantes</h2>
			<div className="flex w-full flex-row gap-4">
				<input
					id="add-participant"
					type="text"
					placeholder="Alejandro Sanz"
					onChange={handleChangeInput}
					value={inputValue}
					className="w-full px-4 py-2"
					onKeyDown={handleAddParticipants}
				/>
				<button
					className="flex flex-row items-center gap-4 rounded-lg bg-zinc-200 px-4 py-2 text-zinc-400 hover:bg-zinc-300"
					onClick={handleAddParticipants}
				>
					<i className="fa-solid fa-plus" />
					Add
				</button>
			</div>

			<div className="flex grow flex-col items-start gap-1 overflow-y-scroll">
				{participants.map((name, index) => {
					return (
						<div
							key={index}
							className="flex w-full flex-row items-center justify-between"
						>
							<p>{name}</p>
							<button
								data-index={index}
								onClick={onClickRemove}
								className="mr-2 p-2"
							>
								<i className="fa-solid fa-xmark text-zinc-400" />
							</button>
						</div>
					)
				})}
			</div>
			<button className="rounded-lg bg-zinc-900 p-4 font-semibold text-zinc-50 hover:opacity-80">
				Next
			</button>
		</div>
	)
}
