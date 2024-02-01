import TableHead from "./TableHead"
import TableBody from "./TableBody"
import { getIntlMonthShort } from "../../utils"

const mockSelectedDates = [
	new Date(2024, 1, 2),
	new Date(2024, 1, 3),
	new Date(2024, 1, 7),
	new Date(2024, 1, 8),
]

const mockParticipants = [
	{ id: crypto.randomUUID(), name: "Participant 1" },
	{ id: crypto.randomUUID(), name: "Participant 2" },
	{ id: crypto.randomUUID(), name: "Participant 3" },
	{ id: crypto.randomUUID(), name: "Participant 4" },
]

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
