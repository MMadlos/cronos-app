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

// function getMonthGridContent(year, monthIndex) {
// 	const date = new Date(year, monthIndex, 1)
// 	const firstWeekDayIndex = date.getDay()

// 	date.setMonth(monthIndex + 1)
// 	date.setDate(0)

// 	const maxDays = date.getDate()

// 	const calendarArray = Array(35).fill()

// 	let count = 1
// 	calendarArray.forEach((_, index) => {
// 		if (index < firstWeekDayIndex - 1) return
// 		if (index - firstWeekDayIndex + 1 > maxDays - 1) return

// 		calendarArray[index] = count
// 		count++
// 	})

// 	return calendarArray
// }

function getMonthGridContent(year, monthIndex) {
	const date = new Date(year, monthIndex, 1)
	const startWeekdayIndex = date.getDay()

	date.setMonth(monthIndex + 1)
	date.setDate(0)

	const lastDate = date.getDate()
	const lastWeekdayIndex = date.getDay()

	const firstPartArray = Array(startWeekdayIndex - 1).fill("")
	const lastPartArray = Array(7 - lastWeekdayIndex).fill("")

	const calendarArray = Array(lastDate)
		.fill()
		.map((_, index) => new Date(year, monthIndex, index + 1))
		.map((date) => date.getDate())

	return [...firstPartArray, ...calendarArray, ...lastPartArray]
}

function getGridMonthType(gridMonthContent, monthIndex, selectedDates) {
	const TYPES = {
		empty: "empty",
		unavailable: "unavailable",
		selected: "selected",
		today: "today",
		default: "default",
	}

	const dateToday = new Date()
	const currentDate = dateToday.getDate()
	const currentMonth = dateToday.getMonth()

	const gridMonthDataType = gridMonthContent.map((content) => {
		if (content === undefined) return TYPES.empty
		if (content < currentDate && monthIndex < currentMonth)
			return TYPES.unavailable
		if (selectedDates.includes(content)) return TYPES.selected
		if (content === currentDate && monthIndex === currentMonth)
			return TYPES.today
		return TYPES.default
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

function getFormattedDates(dates) {
	const formattedDates = dates.map((rawDates) => {
		const month = getIntlMonthShort(rawDates)
		const date = rawDates.getDate()
		const formattedDate = `${month} ${date}`
		return formattedDate
	})

	return formattedDates
}

const getInitCalendarData = () => {
	const currentDate = new Date()
	const currentMonthIndex = currentDate.getMonth()
	const currentYear = currentDate.getFullYear()
	const initCalendarData = {
		year: currentYear,
		monthIndex: currentMonthIndex,
	}
	return initCalendarData
}

const initCalendarData = getInitCalendarData()

export {
	getWeekdays,
	getIntlMonthLong,
	getIntlMonthShort,
	getIntlWeekdayShort,
	getMonthGridContent,
	getGridMonthType,
	getAllSelectedWeekdayDates,
	getFormattedDates,
	initCalendarData,
}
