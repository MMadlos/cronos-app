import TableXS from "./TableXS"

export default function ScreenXS({ confirmed, onClickConfirm, children }) {
	return (
		<div className="w-full sm:hidden ">
			<div className="flex flex-row justify-between gap-2 px-2 py-4">
				<h2 className="text-md font-semibold text-zinc-800 sm:text-lg">
					Calendario de disponibilidad
				</h2>
				<button>Editar</button>
			</div>
			<TableXS confirmed={confirmed} onClickConfirm={onClickConfirm} />

			<div className="bg-violet-100  p-2 sm:hidden">{children}</div>
		</div>
	)
}
