import { useState } from "react"

import TableHead from "./TableHead"
import TableBody from "./TableBody"
import ScreenXS from "./ScreenXS"

export default function Table() {
	const [confirmed, setConfirmed] = useState([])

	function handleConfirmation(id, dateTime) {
		const isIncluded =
			confirmed.find(
				(data) => data.id === id && data.dateTime === dateTime
			) !== undefined

		if (!isIncluded) setConfirmed((prev) => [...prev, { id, dateTime }])
		if (isIncluded) {
			const dataToRemove = confirmed.find(
				(data) => data.id === id && data.dateTime === dateTime
			)
			const newConfirmedArray = confirmed.filter(
				(data) => data !== dataToRemove
			)
			setConfirmed(newConfirmedArray)
		}
	}

	return (
		<>
			<div className="mx-auto hidden h-fit w-[85%] rounded-md bg-white/60 p-10 backdrop-blur-2xl sm:block">
				<h2 className="text-lg font-semibold text-zinc-800">
					Calendario de disponibilidad
				</h2>
				<div className="mb-10 h-[1px] w-full bg-zinc-800"></div>
				<div className="max-h-[60vh] w-full overflow-x-auto  overflow-y-auto rounded-md">
					<table
						id="table"
						className="w-full border-collapse  bg-white"
					>
						<TableHead />
						<TableBody
							confirmed={confirmed}
							onClickData={handleConfirmation}
						/>
					</table>
				</div>
			</div>

			<div className="h-full w-full sm:hidden ">
				<ScreenXS
					confirmed={confirmed}
					onClickConfirm={handleConfirmation}
				/>
			</div>
		</>
	)
}
