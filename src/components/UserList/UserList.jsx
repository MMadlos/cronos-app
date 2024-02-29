import { useState, useContext } from "react"
import { ParticipantsContext } from "../../App"

export default function UserList({
	onClickNext,
	onClickReturn,
	showReturn = true,
	screenXS = false,
}) {
	const { participants, setParticipants } = useContext(ParticipantsContext)
	const [inputValue, setInputValue] = useState("")

	function handleOnChange(e) {
		setInputValue(e.target.value)
	}

	function handleClickAdd() {
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
		<div
			className="mx-auto flex  w-full flex-col gap-6 rounded-md border border-red-400 bg-white p-4 data-[screenxs=true]:max-h-full sm:mb-0 sm:h-[55vh] sm:max-h-[55vh] sm:w-[70%] sm:bg-white sm:p-6 md:shadow-md"
			data-screenxs={screenXS}
		>
			<div className="flex w-full flex-row gap-4">
				<input
					id="add-participant"
					type="text"
					placeholder="Alejandro Sanz"
					onChange={handleOnChange}
					value={inputValue}
					className="w-full rounded border border-zinc-300 px-4 py-2 focus:outline-violet-500"
					onKeyDown={handleKeyDownEnter}
				/>
				<button
					className=" rounded-full bg-violet-700 px-4 py-2 font-semibold text-zinc-50 hover:opacity-50 "
					onClick={handleClickAdd}
				>
					<i className="fa-solid fa-plus text-lg" />
				</button>
			</div>

			<div className="flex grow flex-col items-start gap-2 border border-blue-500 bg-white sm:h-[70%] sm:overflow-y-auto">
				{participants.map((person) => {
					const { id, name } = person
					return (
						<div
							key={id}
							className="flex w-[98%] flex-row items-center justify-between rounded bg-zinc-50 pl-4"
						>
							<p className="text-zinc-800">{name}</p>
							<button
								data-index={id}
								onClick={handleClickRemove}
								className="group mr-2 size-fit p-2 "
							>
								<i className="fa-solid fa-xmark text-zinc-400 group-hover:text-red-500" />
							</button>
						</div>
					)
				})}
			</div>
			<div className=" flex flex-col items-center justify-between gap-4 border border-red-600 sm:flex-row">
				{showReturn && (
					<button
						className="w-full px-8 py-2 font-medium text-red-600 hover:underline-offset-4 hover:opacity-50 sm:w-fit "
						onClick={onClickReturn}
					>
						Volver
					</button>
				)}

				<button
					className="w-full grow rounded bg-zinc-900 px-10 py-2 font-semibold text-zinc-50 hover:opacity-50 disabled:opacity-30 sm:w-[150px] sm:grow-0"
					onClick={onClickNext}
					disabled={participants.length === 0}
				>
					Hecho
				</button>
			</div>
		</div>
	)
}
