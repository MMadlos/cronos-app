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

function getCalendarContent(calendarData, selectedDates) {
	const { year, monthIndex } = calendarData

	const date = new Date(year, monthIndex, 1)
	const startWeekdayIndex = date.getDay()

	date.setMonth(monthIndex + 1)
	date.setDate(0)

	const lastDate = date.getDate()

	const calendarArray = Array(35)
		.fill("")
		.map((_, index) => {
			const data = {}

			// CONTENT
			if (index < startWeekdayIndex - 1) {
				data.content = ""
			} else if (index + 2 - startWeekdayIndex > lastDate) {
				data.content = ""
			} else {
				data.content = index + 2 - startWeekdayIndex
			}

			// TYPES
			if (data.content === "") {
				data.type = DATE_TYPES.empty
			} else if (selectedDates.includes(data.content)) {
				data.type = DATE_TYPES.selected
			} else if (
				data.content < currentDate &&
				monthIndex === currentMonth
			) {
				data.type = DATE_TYPES.unavailable
			} else if (
				data.content === currentDate &&
				monthIndex === currentMonth
			) {
				data.type = DATE_TYPES.today
			} else {
				data.type = DATE_TYPES.default
			}

			return data
		})

	return calendarArray
}

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
	const dateToday = new Date()
	const monthIndex = dateToday.getMonth()
	const year = dateToday.getFullYear()

	return {
		year,
		monthIndex,
	}
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
	getCalendarContent,
}
