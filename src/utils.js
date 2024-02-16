function getWeekdays(locale = "es", format = "short") {
	const weekdaysName = Array(7)
		.fill("")
		.map((_, index) => {
			const date = new Date(2024, 0, index + 1)
			return getIntlWeekdayShort(date)
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

	const calendarArray = Array(35)
		.fill("")
		.map((_, index) => {
			if (index < startWeekdayIndex - 1) return ""

			const date = index + 2 - startWeekdayIndex
			if (lastDate < date) return ""

			return new Date(year, monthIndex, date)
		})
		.map((dateData) => (dateData === "" ? "" : dateData.getDate()))

	return calendarArray
}

const DATE_TYPES = {
	empty: "empty",
	unavailable: "unavailable",
	selected: "selected",
	today: "today",
	default: "default",
}

const dateToday = new Date()
const currentDate = dateToday.getDate()
const currentMonth = dateToday.getMonth()

function getGridMonthType(gridMonthContent, monthIndex, selectedDates) {
	const gridMonthDataType = gridMonthContent.map((content) => {
		if (content === "") return DATE_TYPES.empty

		if (selectedDates.includes(content)) return DATE_TYPES.selected

		const isSameMonth = monthIndex === currentMonth
		if (content < currentDate && isSameMonth) return DATE_TYPES.unavailable
		if (content === currentDate && isSameMonth) return DATE_TYPES.today
		return DATE_TYPES.default
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
