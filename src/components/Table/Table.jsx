import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ selectedDates, participants }) {
	return (
		<div className=": flex w-full items-center justify-items-center overflow-x-auto  bg-zinc-50 pb-8 md:max-w-[1100px]">
			<table id="table" className="w-full border-collapse bg-zinc-50 ">
				<TableHead selectedDates={selectedDates} />
				<TableBody
					peopleList={participants}
					selectedDates={selectedDates}
				/>
			</table>
		</div>
	)
}

// REMOVED TEMPORARY
/*

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

			const state = element.querySelector("[data-status]").dataset.status

			const data = { time, UUID, state }

			rawData.push(data)
		})

		// Sort availability by participants.
		// TODO -> Check with sort() method by date
		const cleanData = participants
		for (let people of cleanData) {
			people.available = []
			people.notAvailable = []
		}

		for (let data of rawData) {
			const { UUID, time } = data
			const [dataToFind] = cleanData.filter(
				(person) => person.id === UUID
			)
			const personIndex = participants.indexOf(dataToFind)

			if (data.state === "Confirmed") {
				cleanData[personIndex].available.push(time)
			}

			if (data.state === "Unknown") {
				cleanData[personIndex].notAvailable.push(time)
			}
		}
	}

*/
