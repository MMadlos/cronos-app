import TableXS from "./TableXS"

export default function ScreenXS({ confirmed, onClickConfirm, children }) {
	return (
		<div className="w-full bg-zinc-50 sm:hidden ">
			<div className="flex flex-row items-center justify-between gap-2 px-2 py-4">
				<h2 className="text-md font-semibold text-zinc-800 sm:text-lg">
					Calendario de disponibilidad
				</h2>
				<button className="size-8">
					<i className="fa-solid fa-pen" />
				</button>
			</div>

			<TableXS confirmed={confirmed} onClickConfirm={onClickConfirm} />
		</div>
	)
}
