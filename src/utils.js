// TODO: GET CURRENT YEAR
const currentYear = new Date().getFullYear()
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
function mappedCalendarData(year, monthIndex, month, maxDays, firstWeekDay, firstWeekDayIndex) {
	return { year, monthIndex, month, maxDays, firstWeekDay, firstWeekDayIndex }
}

function getCurrentCalendar() {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })
	const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" })

	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonthIndex = currentDate.getMonth()

	const firstWeekdayDateObj = new Date(currentYear, currentMonthIndex, 1)
	const firstWeekdayIndex = firstWeekdayDateObj.getDay()

	const currentMonth = intlMonth.format(new Date(currentYear, currentMonthIndex))
	const firstWeekDay = intlWeekday.format(firstWeekdayDateObj)
	const currentMaxDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate()

	const mappedData = mappedCalendarData(currentYear, currentMonthIndex, currentMonth, currentMaxDays, firstWeekDay, firstWeekdayIndex)

	return mappedData
}

function getCalendar(monthIndex, year) {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })
	const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" })

	const firstWeekdayDateObj = new Date(year, monthIndex, 1)
	const firstWeekdayIndex = firstWeekdayDateObj.getDay()

	const month = intlMonth.format(new Date(year, monthIndex))
	const maxDays = new Date(year, monthIndex + 1, 0).getDate()
	const firstWeekDay = intlWeekday.format(firstWeekdayDateObj)

	const mappedData = mappedCalendarData(year, monthIndex, month, maxDays, firstWeekDay, firstWeekdayIndex)

	return mappedData
}

function getIntlMonthShort(date, locale = "es") {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "short" })
	const month = intlMonth.format(date)
	return month
}

function getIntlWeekdayShort(date, locale = "es") {
	const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" })
	const weekday = intlWeekday.format(date)
	return weekday
}

export { weekDaysName, calendar, getCurrentCalendar, getCalendar, getIntlMonthShort, getIntlWeekdayShort }
