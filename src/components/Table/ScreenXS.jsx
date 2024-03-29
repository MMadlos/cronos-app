import { useState } from "react"

import TableXS from "./TableXS"
import DatePicker from "../DatePicker/DatePicker"
import UserList from "../UserList/UserList"

const displayContent = {
	default: "default",
	options: "options",
	editList: "editList",
	editDates: "editDates",
}

export default function ScreenXS({ confirmed, onClickConfirm }) {
	const [content, setContent] = useState(displayContent.default)

	return (
		<div className="h-full w-full p-2 backdrop-blur-sm sm:hidden ">
			{content === displayContent.default && (
				<>
					<HeaderDefault
						onClick={() => setContent(displayContent.options)}
					/>
					<TableXS
						confirmed={confirmed}
						onClickConfirm={onClickConfirm}
					/>
				</>
			)}

			{content === displayContent.options && (
				<>
					<HeaderEdit
						onClick={() => setContent(displayContent.default)}
					/>
					<EditOptions
						onClickEditList={() =>
							setContent(displayContent.editList)
						}
						onClickEditDates={() =>
							setContent(displayContent.editDates)
						}
					/>
				</>
			)}

			{content === displayContent.editDates && (
				<div className="grid h-full content-center">
					<DatePicker
						onClick={() => setContent(displayContent.default)}
					/>
				</div>
			)}

			{content === displayContent.editList && (
				<>
					<UserList
						onClickNext={() => setContent(displayContent.default)}
						showReturn={false}
						screenXS
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
				<i className="fa-solid fa-chevron-left text-lg text-zinc-800" />
			</button>
			<h2 className="text-lg font-semibold text-zinc-800 ">Editar</h2>
		</div>
	)
}

function HeaderDefault({ onClick }) {
	return (
		<div className="flex flex-row items-center justify-between gap-2 px-2 py-2">
			<h2 className="font-semibold text-zinc-800 ">
				Calendario de disponibilidad
			</h2>
			<button className=" px-3 py-2" onClick={onClick}>
				<i className="fa-solid fa-pen text-lg text-zinc-800" />
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
