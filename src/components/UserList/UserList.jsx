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
		<div className="mx-auto flex w-fit flex-col gap-6 rounded-xl bg-zinc-50 p-6 shadow-lg">
			<h2 className=" font-semibold text-zinc-600">Participantes</h2>
			<div className="flex w-full flex-row gap-4">
				<input
					id="add-participant"
					type="text"
					placeholder="Alejandro Sanz"
					onChange={handleOnChange}
					value={inputValue}
					className="w-full rounded border-2 border-zinc-300 px-4 py-2"
					onKeyDown={handleKeyDownEnter}
				/>
				<button
					className="flex flex-row items-center gap-2 rounded bg-violet-600 px-4 py-2 font-semibold text-zinc-50 hover:opacity-50"
					onClick={handleClickAdd}
				>
					<i className="fa-solid fa-plus text-sm" />
					Add
				</button>
			</div>

			<div className="flex max-h-[200px] grow flex-col items-start gap-1 overflow-y-scroll bg-white pl-4">
				{participants.map((person) => {
					const { id, name } = person
					return (
						<div
							key={id}
							className="flex w-full flex-row items-center justify-between"
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
					className="font-medium text-red-500 underline underline-offset-8 hover:opacity-50"
					onClick={onClickReturn}
				>
					Return
				</button>
				<button
					className="rounded-lg bg-zinc-900 px-10 py-2 font-semibold text-zinc-50 hover:opacity-80"
					onClick={onClickNext}
				>
					Done
				</button>
			</div>
		</div>
	)
}
