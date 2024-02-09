import { useState, useEffect } from "react"
import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ selectedDates, participants }) {
	const [confirmedDates, setConfirmedDates] = useState({})

	useEffect(() => {
		const newConfirmedDates = {}
		selectedDates.forEach((dateObj) => {
			const dateTime = dateObj.getTime()
			newConfirmedDates[dateTime] = []
		})

		setConfirmedDates(newConfirmedDates)
	}, [selectedDates])

	function countConfirmedDates(headers, state) {
		const headersData = headers.split(" ")
		const [dateTime, id] = headersData

		const newConfirmedDates = confirmedDates

		if (state === "Confirmed") {
			newConfirmedDates[dateTime].push(id)
		} else {
			const newDatesArray = newConfirmedDates[dateTime].filter(
				(userID) => userID !== id
			)
			newConfirmedDates[dateTime] = newDatesArray
		}

		setConfirmedDates(newConfirmedDates)
	}

	return (
		<div className=" max-h-[40vh] w-full  overflow-x-auto overflow-y-auto rounded-lg bg-white pb-4 pr-4">
			<table id="table" className="w-full border-collapse bg-white ">
				<TableHead selectedDates={selectedDates} />
				<TableBody
					peopleList={participants}
					selectedDates={selectedDates}
					onClickCell={countConfirmedDates}
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
