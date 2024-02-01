import { getIntlMonthShort } from "../../utils"
import { mockSelectedDates, mockParticipants } from "../../mockData"

import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table() {
	const formattedDates = mockSelectedDates.map((rawDates) => {
		const month = getIntlMonthShort(rawDates)
		const date = rawDates.getDate()
		const formattedDate = `${month} ${date}`
		return formattedDate
	})

	return (
		<div className="bg-zinc-200 p-8">
			<table className="w-fit bg-zinc-50">
				<TableHead formattedDates={formattedDates} />
				<TableBody
					peopleList={mockParticipants}
					formattedDates={formattedDates}
				/>
			</table>
		</div>
	)
}
