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

function getIntlMonthLong(monthIndex, locale = "es") {
	const intlMonth = new Intl.DateTimeFormat(locale, { month: "long" })
	const date = new Date()

	date.setMonth(monthIndex)
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

function getMonthGridContent(year, monthIndex) {
	const date = new Date(year, monthIndex, 1)
	const firstWeekDayIndex = date.getDay()

	date.setMonth(monthIndex + 1)
	date.setDate(0)

	const maxDays = date.getDate()

	const calendarArray = Array(35).fill()

	let count = 1
	calendarArray.forEach((_, index) => {
		if (index < firstWeekDayIndex - 1) return
		if (index - firstWeekDayIndex + 1 > maxDays - 1) return

		calendarArray[index] = count
		count++
	})

	return calendarArray
}

export {
	getWeekdays,
	getIntlMonthLong,
	getIntlMonthShort,
	getIntlWeekdayShort,
	getMonthGridContent,
}
