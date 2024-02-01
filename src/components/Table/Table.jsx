import TableData from "./TableData"
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
			<table className="rounded-3xl bg-zinc-50 ">
				<caption>Calendar grid with participants</caption>
				<thead>
					<tr>
						<th id="participants">Participants</th>
						{formattedDates.map((dates, index) => {
							const headerDate = dates.split(" ").join("-")

							return (
								<th key={index} id={headerDate}>
									{dates}
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>
					{mockParticipants.map((participandData, index) => {
						const { id, name } = participandData

						return (
							<tr key={index}>
								<th id="id" headers="participants">
									{name}
								</th>
								{formattedDates.map((dates, _index) => {
									const headerDate = dates
										.split(" ")
										.join("-")
									return (
										<TableData
											thID={`${headerDate} ${id}`}
										/>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
