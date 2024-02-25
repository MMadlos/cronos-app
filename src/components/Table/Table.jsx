import { useState } from "react"

import TableHead from "./TableHead"
import TableBody from "./TableBody"
import TableXS from "./TableXS"

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
			<div className="mt-2 hidden max-h-[70vh] w-full overflow-x-auto overflow-y-auto sm:mt-6 sm:block sm:max-h-[60vh]">
				<table id="table" className="w-full border-collapse bg-white">
					<TableHead />
					<TableBody
						confirmed={confirmed}
						onClickData={handleConfirmation}
					/>
				</table>
			</div>
			<div className="mt-2 max-h-[70vh] w-full sm:mt-6 sm:hidden sm:max-h-[60vh]">
				<TableXS
					confirmed={confirmed}
					onClickConfirm={handleConfirmation}
				/>
			</div>
		</>
	)
}
