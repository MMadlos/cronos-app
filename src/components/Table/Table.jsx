import { mockSelectedDates, mockParticipants } from "../../mockData"

import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table() {
	function getTableData(e) {
		const table = e.target.closest("#table")
		const allHeadersEl = table.querySelectorAll("[headers]")

		// Get all elements needed from table
		const rawData = []
		allHeadersEl.forEach((element) => {
			if (element.headers === "participants") return

			const rawHeaders = element.headers
			const headers = rawHeaders.split(" ")
			const [time, UUID] = headers

			const dataStatus =
				element.querySelector("[data-status]").dataset.status

			const data = { time, UUID, state: dataStatus }

			rawData.push(data)
		})

		// Map from participants to fill availability later
		const cleanData = mockParticipants
		for (let people of cleanData) {
			people.available = []
			people.notAvailable = []
		}

		// Push times to the participantes array
		for (let data of rawData) {
			const { UUID, time } = data
			const [dataToFind] = cleanData.filter(
				(person) => person.id === UUID
			)
			const personIndex = mockParticipants.indexOf(dataToFind)

			if (data.state === "Confirmed") {
				cleanData[personIndex].available.push(time)
			}

			if (data.state === "Unknown") {
				cleanData[personIndex].notAvailable.push(time)
			}
		}
	}

	return (
		<div className="bg-zinc-200 p-8">
			<table id="table" className="w-fit bg-zinc-50">
				<TableHead selectedDates={mockSelectedDates} />
				<TableBody
					peopleList={mockParticipants}
					selectedDates={mockSelectedDates}
				/>
				<button onClick={getTableData}>Test</button>
			</table>
		</div>
	)
}
