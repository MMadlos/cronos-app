const dateToday = new Date()
const date = dateToday.getDate()
const monthIndex = dateToday.getMonth()
const year = dateToday.getFullYear()

function getMockSelectedDates(length) {
	const mockSelectedDates = []

	let currentDate = date + 1
	let currentMonthIndex = monthIndex
	let currentYear = year
	for (let i = 0; i < length; i++) {
		const newDate = new Date(currentYear, currentMonthIndex, currentDate)
		mockSelectedDates.push(newDate.getTime())

		if (i % 2 === 0) currentDate++
		if (i % 2 !== 0) currentDate += 6
	}

	return mockSelectedDates
}

const mockSelectedDates = getMockSelectedDates(8)

const NAMES = [
	"Alejandro Sanz",
	"Shakira",
	"José Fernando Gutiérrez",
	"María",
	"Almudena",
	"Rocío",
	"Alejandro Sanz",
	"Shakira",
	"José Fernando Gutiérrez",
	"María",
	"Almudena",
	"Rocío",
]

const mockParticipants = NAMES.map((name) => {
	return { id: crypto.randomUUID(), name }
})

const mockConfirmedData = mockParticipants.map((personData) => {
	return { dateTime: mockSelectedDates[0], participant: personData.id }
})

mockConfirmedData.push({
	dateTime: mockSelectedDates[1],
	participant: mockParticipants[0].id,
})

const mockConfirmedList = [
	mockParticipants[0].id,
	mockParticipants[1].id,
	mockParticipants[2].id,
	mockParticipants[3].id,
]

const mockSelectedPerson = mockParticipants[0]

export {
	mockSelectedDates,
	mockParticipants,
	mockConfirmedData,
	mockConfirmedList,
	mockSelectedPerson,
}
