import { useState } from "react"

import TableXS from "./TableXS"

// TODO
// Al hacer click en calendario disponibilidad, se tiene que abrir un selector para abrir o editar participantes o editar calendario.

export default function ScreenXS({ confirmed, onClickConfirm }) {
	const [isEdit, setIsEdit] = useState(true)

	return (
		<div className="h-full w-full bg-zinc-50 sm:hidden ">
			{isEdit ? (
				<>
					<HeaderEdit onClick={() => setIsEdit(false)} />
					<EditOptions
						onClickEditList={() => {}}
						onClickEditDates={() => {}}
					/>
				</>
			) : (
				<>
					<HeaderDefault onClick={() => setIsEdit(true)} />
					<TableXS
						confirmed={confirmed}
						onClickConfirm={onClickConfirm}
					/>
				</>
			)}
		</div>
	)
}

function HeaderEdit({ onClick }) {
	return (
		<div className="flex flex-row items-center gap-1 px-2 py-2">
			<button className="px-3 py-2" onClick={onClick}>
				<i className="fa-solid fa-chevron-left text-lg text-zinc-500" />
			</button>
			<h2 className="text-lg font-medium text-zinc-800 ">Editar</h2>
		</div>
	)
}

function HeaderDefault({ onClick }) {
	return (
		<div className="flex flex-row items-center justify-between gap-2 px-2 py-2">
			<h2 className="text-lg font-medium text-zinc-800 ">
				Calendario de disponibilidad
			</h2>
			<button className=" px-3 py-2" onClick={onClick}>
				<i className="fa-solid fa-pen text-lg text-zinc-500" />
			</button>
		</div>
	)
}

function EditOptions({ onClickEditList, onClickEditDates }) {
	return (
		<div className="m-2 flex flex-col gap-2 divide-y rounded border bg-white p-2">
			<button
				className="flex flex-row items-center justify-between p-2"
				onClick={onClickEditList}
			>
				Lista de participantes
				<i className="fa-solid fa-chevron-right text-lg text-zinc-500" />
			</button>
			<button
				className="flex flex-row items-center justify-between p-2"
				onClick={onClickEditDates}
			>
				Fechas seleccionadas
				<i className="fa-solid fa-chevron-right text-lg text-zinc-500" />
			</button>
		</div>
	)
}
