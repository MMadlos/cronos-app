import { useState } from "react"

import TableHead from "./TableHead"
import TableBody from "./TableBody"
import TableXS from "./TableXS"
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
			<div className="mt-8 hidden sm:block ">
				{/* Table SCREEN */}
				<h2 className="text-md font-semibold text-zinc-600 sm:text-lg">
					Fechas propuestas
				</h2>
				<div className="h-[1px] w-full bg-zinc-200"></div>
				<div className="mt-2 max-h-[70vh] w-full overflow-x-auto overflow-y-auto sm:mt-6  sm:max-h-[60vh]">
					<table
						id="table"
						className="w-full border-collapse bg-white"
					>
						<TableHead />
						<TableBody
							confirmed={confirmed}
							onClickData={handleConfirmation}
						/>
					</table>
				</div>
			</div>
			<div className="w-full sm:hidden ">
				<ScreenXS
					confirmed={confirmed}
					onClickConfirm={handleConfirmation}
				/>
			</div>
		</>
	)
}
