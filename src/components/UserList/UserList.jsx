import { useState, useContext } from "react"
import { ParticipantsContext } from "../../App"

export default function UserList({ onClickNext, onClickReturn }) {
	const { participants, setParticipants } = useContext(ParticipantsContext)
	const [inputValue, setInputValue] = useState("")

	function handleOnChange(e) {
		setInputValue(e.target.value)
	}

	function handleClickAdd() {
		// TODO - Add message for empty input
		if (inputValue === "") return

		const newPerson = { id: crypto.randomUUID(), name: inputValue }
		setParticipants((prev) => [newPerson, ...prev])
		setInputValue("")
	}

	function handleKeyDownEnter(e) {
		if (e.key === "Enter") {
			const newPerson = { id: crypto.randomUUID(), name: e.target.value }
			setParticipants((prev) => [newPerson, ...prev])
			setInputValue("")
		}
	}

	function handleClickRemove(e) {
		const userIndex = e.target.closest("button").dataset.index
		const list = participants.filter((person) => person.id !== userIndex)
		setParticipants(list)
	}

	return (
		<div className="mx-auto flex h-[90%] w-[70%] flex-col gap-6 rounded-lg bg-white p-6 shadow-md shadow-zinc-200">
			{/* <h2 className=" font-semibold text-zinc-600">Participantes</h2> */}
			<div className="flex w-full flex-row gap-4">
				<input
					id="add-participant"
					type="text"
					placeholder="Alejandro Sanz"
					onChange={handleOnChange}
					value={inputValue}
					className="w-full rounded border border-zinc-300 px-4 py-2"
					onKeyDown={handleKeyDownEnter}
				/>
				<button
					className=" rounded-full bg-zinc-900 px-4 py-2 font-semibold text-zinc-50 hover:opacity-50"
					onClick={handleClickAdd}
				>
					<i className="fa-solid fa-plus text-lg" />
				</button>
			</div>

			<div className="flex h-[70%] grow flex-col items-start gap-1 overflow-y-auto bg-white pl-4">
				{participants.map((person) => {
					const { id, name } = person
					return (
						<div
							key={id}
							className="flex w-full flex-row items-center justify-between bg-zinc-50"
						>
							<p className="text-zinc-800">{name}</p>
							<button
								data-index={id}
								onClick={handleClickRemove}
								className="mr-2 p-2"
							>
								<i className="fa-solid fa-xmark text-zinc-400" />
							</button>
						</div>
					)
				})}
			</div>
			<div className="flex flex-row items-center justify-between">
				<button
					className="font-medium text-red-600 hover:underline-offset-4 hover:opacity-50 "
					onClick={onClickReturn}
				>
					Return
				</button>
				<button
					className="min-w-[150px] rounded bg-zinc-900 px-10 py-2 font-semibold text-zinc-50 hover:opacity-50 disabled:opacity-30"
					onClick={onClickNext}
					disabled={participants.length === 0}
				>
					Done
				</button>
			</div>
		</div>
	)
}
