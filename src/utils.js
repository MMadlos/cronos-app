// TODO: GET CURRENT YEAR
const currentYear = 2024
const locale = "es"

const weekdays = [...Array(7).keys()]
const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" })

const weekDaysName = weekdays.map((weekDayIndex) => {
	const date = new Date(2024, 0, weekDayIndex + 1)
	const weekDayName = intlWeekday.format(date)

	return weekDayName
})

const months = [...Array(12).keys()]
const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })

const calendar = months.map((monthKey) => {
	const monthName = intlMonth.format(new Date(currentYear, monthKey))

	const nextMonthIndex = monthKey + 1
	const daysOfMonth = new Date(2024, nextMonthIndex, 0).getDate()
	const startsOn = new Date(2024, monthKey, 1).getDay()

	return { monthName, daysOfMonth, startsOn }
})

// FUNCIÓN QUE SÓLO GENERE EL MES ACTUAL
function getCurrentCalendar() {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })
	const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" })

	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonthIndex = currentDate.getMonth()

	const currentMonth = intlMonth.format(new Date(currentYear, currentMonthIndex))
	const currentMaxDays = new Date(2024, currentMonthIndex + 1, 0).getDate()
	const firstWeekDay = intlWeekday.format(new Date(2024, 0, 1))

	return {
		currentYear,
		currentMonth,
		currentMaxDays,
		firstWeekDay,
	}
}

console.log(getCurrentCalendar())

export { weekDaysName, calendar, getCurrentCalendar }
