// TODO: GET CURRENT YEAR
const currentYear = 2024

// TODO: GET LOCALE FROM PC
const locale = "es"

const weekdays = [...Array(7).keys()]
const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "long" })

const weekDaysName = weekdays.map((weekDayIndex) => {
	const date = new Date(2024, 0, weekDayIndex + 1)
	const weekDayName = intlWeekday.format(date)

	return weekDayName
})

const months = [...Array(12).keys()]
const intl = new Intl.DateTimeFormat(locale, { month: "long" })

const calendar = months.map((monthKey) => {
	const monthName = intl.format(new Date(currentYear, monthKey))

	const nextMonthIndex = monthKey + 1
	const daysOfMonth = new Date(2024, nextMonthIndex, 0).getDate()
	const startsOn = new Date(2024, monthKey, 1).getDay()

	return { monthName, daysOfMonth, startsOn }
})

export { weekDaysName, calendar }
