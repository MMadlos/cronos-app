export default function UserList({
	participants,
	inputValue,
	onKeyDownEnter,
	onClickAdd,
	onClickRemove,
	onChangeInput,
	onClickNext,
	onClickReturn,
}) {
	return (
		<div className="mx-auto flex w-fit flex-col gap-6 rounded-xl bg-zinc-50 p-6 shadow-lg">
			<h2 className=" font-semibold text-zinc-600">Participantes</h2>
			<div className="flex w-full flex-row gap-4">
				<input
					id="add-participant"
					type="text"
					placeholder="Alejandro Sanz"
					onChange={onChangeInput}
					value={inputValue}
					className="w-full rounded border-2 border-zinc-300 px-4 py-2"
					onKeyDown={onKeyDownEnter}
				/>
				<button
					className="flex flex-row items-center gap-2 rounded bg-violet-600 px-4 py-2 font-semibold text-zinc-50 hover:opacity-50"
					onClick={onClickAdd}
				>
					<i className="fa-solid fa-plus text-sm" />
					Add
				</button>
			</div>

			<div className="flex max-h-[200px] grow flex-col items-start gap-1 overflow-y-scroll bg-white pl-4">
				{participants.map((person, index) => {
					const { id, name } = person
					return (
						<div
							key={id}
							className="flex w-full flex-row items-center justify-between"
						>
							<p className="text-zinc-800">{name}</p>
							<button
								data-index={id}
								onClick={onClickRemove}
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
