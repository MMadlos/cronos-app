import { useState } from "react"

import { getCurrentCalendar, getCalendar } from "../utils"

import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"

const initSelectedDays = [
	{
		year: 2024,
		month: "enero",
		day: "mar",
		date: 2,
	},
	{
		year: 2024,
		month: "enero",
		day: "lun",
		date: 8,
	},
	{
		year: 2024,
		month: "enero",
		day: "vie",
		date: 19,
	},
]

const newSelectedDates = [new Date(2024, 0, 2), new Date(2024, 0, 3), new Date(2024, 0, 19)]

const firstDate = new Date(2024, 0, 2)
const secondDate = new Date(2024, 0, 2)

const firstDateTime = firstDate.getTime()
const secondDateTime = secondDate.getTime()

// const areSame = firstDate === secondDate
// const areSame = typeof firstDate === typeof secondDate
const areSame = firstDateTime === secondDateTime
const isThisTheSame = firstDate === secondDate

console.log({ firstDateTime, secondDateTime, areSame })
console.log({ firstDate, secondDate, isThisTheSame })

// const fullFormattedDates = newSelectedDates.map((dates) => {
// 	const locale = "es"
// 	const options = {
// 		weekday: "short",
// 		year: "numeric",
// 		month: "short",
// 		day: "numeric",
// 	}
// 	const intlFull = new Intl.DateTimeFormat(locale, options)

// 	return intlFull.format(dates)
// })

const getDataSelectedDates = newSelectedDates.map((dates) => {
	const year = dates.getFullYear()
	const monthIndex = dates.getMonth()
	const dayIndex = dates.getDay()
	const date = dates.getDate()

	const intlMonth = new Intl.DateTimeFormat("es", { month: "short" })
	const intlWeekday = new Intl.DateTimeFormat("es", { weekday: "short" })

	const month = intlMonth.format(monthIndex)
	const weekday = intlWeekday.format(dayIndex)

	return { year, month, weekday, date }
})

console.log(getDataSelectedDates)

function Calendar() {
	const [calendar, setCalendar] = useState(getCurrentCalendar())
	const [selectedDays, setSelectedDays] = useState(initSelectedDays)

	function handleMonthArrows(e) {
		const currentMonthIndexEl = e.target.closest("[data-month-index]")
		const currentMonthIndex = Number(currentMonthIndexEl.dataset.monthIndex)
		const arrowType = e.target.closest("[data-type]").dataset.type

		const monthIndex = arrowType === "next" ? currentMonthIndex + 1 : currentMonthIndex - 1

		const newCalendar = getCalendar(monthIndex, calendar.year)
		setCalendar(newCalendar)
	}

	function handleAddSelectedDays(e) {
		const getDate = e.target.closest("[data-date]").dataset.date
		const formattedDate = getDate.split("-").map((num) => Number(num))

		const [year, monthIndex, date] = formattedDate

		const dateObject = new Date(year, monthIndex, date)

		const locale = "es"
		const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" })
		const intlMonth = new Intl.DateTimeFormat(locale, { month: "short" })

		const month = intlMonth.format(dateObject)
		const weekday = intlWeekday.format(dateObject)

		const newSelectedDate = {
			year,
			month,
			day: weekday,
			date,
		}

		setSelectedDays((prev) => [...prev, newSelectedDate])
	}

	return (
		<div className="my-8 flex flex-col gap-4">
			<div>
				<p>Selected days</p>
				<div className="flex gap-4">
					{selectedDays.map((dayObj, index) => {
						const { month, day, date } = dayObj

						return (
							<div key={index}>
								<p>{month}</p>
								<p>{day}</p>
								<p>{date}</p>
							</div>
						)
					})}
				</div>
			</div>
			<div
				id="calendar"
				className="w-[800px]  bg-indigo-50 p-8 flex flex-col gap-6 rounded-xl">
				<CalendarHeader
					calendarData={calendar}
					onClick={handleMonthArrows}
				/>
				<CalendarBody
					calendarData={calendar}
					onClickAddDate={handleAddSelectedDays}
				/>
			</div>
		</div>
	)
}

export default Calendar
