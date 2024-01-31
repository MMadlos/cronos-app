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

function getGridMonthType(gridMonthContent, monthIndex, filteredSelectedDates) {
	const dateToday = new Date()

	const gridMonthDataType = []
	gridMonthContent.forEach((contentCell) => {
		if (contentCell === undefined) return gridMonthDataType.push("empty")

		const isPastDate =
			contentCell < dateToday.getDate() &&
			monthIndex === dateToday.getMonth()

		if (isPastDate) return gridMonthDataType.push("unavailable")

		const isSelected = filteredSelectedDates.includes(contentCell)
		if (isSelected) return gridMonthDataType.push("selected")

		const isToday =
			contentCell === dateToday.getDate() &&
			monthIndex === dateToday.getMonth()
		if (isToday) return gridMonthDataType.push("today")

		return gridMonthDataType.push("default")
	})

	return gridMonthDataType
}

function getAllSelectedWeekdayDates(year, monthIndex, dataWeekdayIndex) {
	const date = new Date(year, monthIndex, 1)
	const firstWeekdayIndex = date.getDay()

	date.setMonth(monthIndex + 1)
	date.setDate(0)

	const lastDate = date.getDate()
	const firstDate = dataWeekdayIndex - firstWeekdayIndex + 1

	const today = new Date()
	const todayDate = today.getDate()
	const todayMonth = today.getMonth()

	const selectedDatesArray = []
	for (let i = firstDate; i <= lastDate; i += 7) {
		if (i <= 0) continue
		if (i < todayDate && monthIndex === todayMonth) continue

		selectedDatesArray.push(i)
	}

	return selectedDatesArray
}

export {
	getWeekdays,
	getIntlMonthLong,
	getIntlMonthShort,
	getIntlWeekdayShort,
	getMonthGridContent,
	getGridMonthType,
	getAllSelectedWeekdayDates,
}
