import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"

import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ selectedDates, participants }) {
	// 8. El total de filas = 1 (mes) + 1 (días) + num total de participantes

	const sortedByMonth = {}
	selectedDates.forEach((object) => {
		const month = getIntlMonthLong(object)
		const weekday = getIntlWeekdayShort(object)
		const date = object.getDate()

		if (sortedByMonth[month] === undefined) sortedByMonth[month] = []
		sortedByMonth[month].push({ weekday, date })
	})

	const tableCount = {
		monthCount: Object.keys(sortedByMonth).length,
	}

	for (let month in sortedByMonth) {
		tableCount[month] = sortedByMonth[month].length
	}

	const allMonths = Object.keys(sortedByMonth)
	const allDates = Object.values(sortedByMonth).flat()

	return (
		<div className=": w-full overflow-x-auto  bg-zinc-200 md:max-w-[1200px] md:rounded-xl">
			<table id="table" className="w-full border-collapse bg-zinc-50 ">
				<thead>
					<tr>
						<th id="empty-th"></th>
						{allMonths.map((month, index) => {
							const colSpan = tableCount[month]

							return (
								<th key={index} id={index} colSpan={colSpan}>
									{month}
								</th>
							)
						})}
						<th></th>
					</tr>
					<tr>
						<th id="participants">Participantes</th>
						{allDates.map((dates, index) => {
							const { weekday, date } = dates

							return (
								<th key={index} id={index}>
									{`${weekday} ${date}`}
								</th>
							)
						})}
						<th></th>
					</tr>
				</thead>
				<TableBody
					peopleList={participants}
					selectedDates={selectedDates}
				/>
			</table>
		</div>
	)
}

// BACKUP
/*
<TableHead selectedDates={selectedDates} />
*/

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
