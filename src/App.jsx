import "./App.css"
import { useState } from "react"
import { getAllSelectedWeekdayDates } from "./utils"
import { mockSelectedDates, mockParticipants } from "./mockData"

import Calendar from "./components/Calendar/Calendar"
import Table from "./components/Table/Table"
import UserList from "./components/UserList/UserList"

const currentDate = new Date()
const currentMonthIndex = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const initiCalendarData = {
	year: currentYear,
	monthIndex: currentMonthIndex,
}

const stages = ["calendar", "list", "table"]
// TODO - Add buttons behaviours in stage 0. When no dates are selected -> Reset not available and done not active.

function App() {
	const [calendarData, setCalendarData] = useState(initiCalendarData)
	const [selectedDays, setSelectedDays] = useState(mockSelectedDates)

	const [participants, setParticipants] = useState(mockParticipants)
	const [inputValue, setInputValue] = useState("")

	const [stage, setStage] = useState(stages[0])

	function handleMonthArrows(e) {
		const newMonthIndexEl = e.target.closest("[data-index]").dataset.index
		const newMonthIndex = Number(newMonthIndexEl)

		const newCalendarData = {
			year: calendarData.year,
			monthIndex: newMonthIndex,
		}

		setCalendarData(newCalendarData)
	}

	function handleSelectDays(e) {
		const dataDate = e.target.closest("[data-date]").dataset.date

		const { year, monthIndex } = calendarData

		const selectedDate = new Date(year, monthIndex, dataDate)
		const selectedDateTime = selectedDate.getTime()

		const selectedDaysTime = selectedDays.map((dates) => dates.getTime())
		const isIncluded = selectedDaysTime.includes(selectedDateTime)

		if (isIncluded) {
			const newSelectedDays = selectedDaysTime
				.filter((selected) => selected !== selectedDateTime)
				.sort()
				.map((datesTime) => new Date(datesTime))

			setSelectedDays(newSelectedDays)
		}

		if (!isIncluded) {
			const newSelectedDays = [...selectedDays, selectedDate]
				.map((dates) => dates.getTime())
				.sort()
				.map((datesMS) => new Date(datesMS))

			setSelectedDays(newSelectedDays)
		}
	}

	function handleSelectWeek(e) {
		const weekdayIndex = e.target.closest("button").dataset.weekIndex

		const { year, monthIndex } = calendarData

		const selectedDatesArray = getAllSelectedWeekdayDates(
			year,
			monthIndex,
			weekdayIndex
		)

		const selectedDatesTime = selectedDatesArray.map((date) => {
			const newDate = new Date(year, monthIndex, date)
			return newDate.getTime()
		})

		const currentSelectedDaysTime = selectedDays.map((dates) => {
			return dates.getTime()
		})

		const areAllAlreadySelected = selectedDatesTime.every((dates) =>
			currentSelectedDaysTime.includes(dates)
		)

		if (!areAllAlreadySelected) {
			selectedDatesTime.forEach((dateTime) => {
				const isIncluded = currentSelectedDaysTime.includes(dateTime)
				if (isIncluded) return

				currentSelectedDaysTime.push(dateTime)
			})

			const newSelectedDays = currentSelectedDaysTime
				.sort()
				.map((datesTime) => new Date(datesTime))

			setSelectedDays(newSelectedDays)
		}

		if (areAllAlreadySelected) {
			const newSelectedDays = currentSelectedDaysTime
				.filter((datesTime) => {
					const isIncluded = selectedDatesTime.includes(datesTime)
					if (!isIncluded) return datesTime
				})
				.sort()
				.map((dates) => new Date(dates))

			setSelectedDays(newSelectedDays)
		}
	}

	function handleChangeInput(e) {
		setInputValue(e.target.value)
	}

	function handleAddParticipants(e) {
		// TODO - Add message for empty input
		if (inputValue === "") return

		if (e.key === "Enter" || e.type === "click") {
			const newPerson = { id: crypto.randomUUID(), name: inputValue }
			setParticipants((prev) => [...prev, newPerson])
			setInputValue("")
		}
	}

	function handleClickRemove(e) {
		const userIndex = e.target.closest("button").dataset.index
		const list = participants.filter((person) => person.id !== userIndex)
		setParticipants(list)
	}

	return (
		<div className="container mx-auto min-h-dvh min-w-[300px] max-w-[800px] bg-zinc-50 px-8">
			<header className="py-8">
				<img
					src="src/images/birthday-md.jpg"
					alt="an image with party elements"
					className="h-[250px] w-full rounded-lg object-cover object-top"
				/>
			</header>
			<section>
				<div className="flex flex-row items-center gap-4">
					<h1 className=" text-2xl font-semibold text-zinc-700">
						Cumpleaños Mari Pili
					</h1>
					<i className="fa-solid fa-pen cursor-pointer rounded p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500" />
				</div>
				<div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
					<p className="leading-relaxed text-zinc-800">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Distinctio molestiae minus quaerat aliquam ex?
						Exercitationem incidunt, ducimus molestias perspiciatis
						perferendis nisi voluptatibus veniam dolorum sapiente,
						quae voluptatem magni eius provident.
					</p>
				</div>
			</section>
			<main className="flex  flex-col items-center justify-center bg-indigo-100">
				{stage === stages[0] && (
					<div>
						<Calendar
							calendarData={calendarData}
							selectedDays={selectedDays}
							onClickArrows={handleMonthArrows}
							onClickDate={handleSelectDays}
							onClickWeekday={handleSelectWeek}
						/>
						<div className="mt-8 flex w-full flex-row justify-between">
							<button
								className="rounded-lg bg-zinc-50 px-6 py-2 font-semibold text-red-600 hover:opacity-50"
								onClick={() => setSelectedDays([])}
							>
								{selectedDays.length === 0
									? "Select days"
									: "Reset"}
							</button>
							<button
								className="rounded-lg bg-zinc-900 px-6 py-2 font-semibold text-zinc-50 hover:opacity-50"
								onClick={() => {
									if (selectedDays.length === 0) return
									setStage(stages[1])
								}}
							>
								Done
							</button>
						</div>
					</div>
				)}

				{stage === stages[1] && (
					<UserList
						participants={participants}
						inputValue={inputValue}
						onChangeInput={handleChangeInput}
						onKeyDownEnter={handleAddParticipants}
						onClickAdd={handleAddParticipants}
						onClickRemove={handleClickRemove}
						onClickNext={() => setStage(stages[2])}
						onClickReturn={() => setStage(stages[0])}
					/>
				)}

				{stage === stages[2] && (
					<div className="h-dvh max-w-[80dvw] bg-slate-50 px-20 pt-10">
						<div className="flex flex-row items-center justify-between pb-2">
							<div className="flex flex-row items-center gap-4 ">
								<h1 className="text-left text-3xl font-bold text-zinc-600">
									Título
								</h1>
								<i className="fa-solid fa-pen text-zinc-300 hover:cursor-pointer hover:text-zinc-400" />
							</div>
							<button className="rounded-md border border-zinc-300 bg-zinc-100 px-10 py-2 font-semibold text-zinc-500 hover:bg-zinc-200 hover:text-zinc-600">
								Edit
							</button>
						</div>
						<div className="mb-8 border-b-4 border-zinc-300"></div>
						<Table
							participants={participants}
							selectedDates={selectedDays}
						/>
					</div>
				)}
			</main>
		</div>
	)
}

export default App
