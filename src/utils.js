const currentYear = new Date().getFullYear()
const locale = "es"

function getWeekdays(locale = "es", format = "short") {
	const weekdays = [...Array(7).keys()]
	const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: format })
	const weekdaysName = weekdays.map((weekDayIndex) => {
		const date = new Date(2024, 0, weekDayIndex + 1)
		const weekdayName = intlWeekday.format(date)

		return weekdayName
	})

	return weekdaysName
}

function mappedCalendarData(
	year,
	monthIndex,
	month,
	maxDays,
	firstWeekDay,
	firstWeekDayIndex
) {
	return { year, monthIndex, month, maxDays, firstWeekDay, firstWeekDayIndex }
}

function getCurrentCalendar() {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })
	const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: "long" })

	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonthIndex = currentDate.getMonth()

	const firstWeekdayDateObj = new Date(currentYear, currentMonthIndex, 1)
	const firstWeekdayIndex = firstWeekdayDateObj.getDay()

	const currentMonth = intlMonth.format(
		new Date(currentYear, currentMonthIndex)
	)
	const firstWeekDay = intlWeekday.format(firstWeekdayDateObj)
	const currentMaxDays = new Date(
		currentYear,
		currentMonthIndex + 1,
		0
	).getDate()

	const mappedData = mappedCalendarData(
		currentYear,
		currentMonthIndex,
		currentMonth,
		currentMaxDays,
		firstWeekDay,
		firstWeekdayIndex
	)

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

	const mappedData = mappedCalendarData(
		year,
		monthIndex,
		month,
		maxDays,
		firstWeekDay,
		firstWeekdayIndex
	)

	return mappedData
}

function getIntlMonthLong(date, locale = "es") {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })
	const month = intlMonth.format(date)
	return month
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

export {
	getWeekdays,
	getCurrentCalendar,
	getCalendar,
	getIntlMonthShort,
	getIntlWeekdayShort,
}
