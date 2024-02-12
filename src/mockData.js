const mockSelectedDates = [
	new Date(2024, 1, 7),
	new Date(2024, 1, 8),
	new Date(2024, 2, 1),
	new Date(2024, 2, 9),
	new Date(2024, 2, 10),
]

const mockParticipants = [
	{ id: crypto.randomUUID(), name: "Alejandro Sanz" },
	{ id: crypto.randomUUID(), name: "Shakira" },
	{ id: crypto.randomUUID(), name: "Jose Fernando Gutiérrez" },
	{ id: crypto.randomUUID(), name: "María" },
]

const mockConfirmedData = [
	{
		dateTime: mockSelectedDates[0].getTime(),
		participant: mockParticipants[0].id,
	},
	{
		dateTime: mockSelectedDates[0].getTime(),
		participant: mockParticipants[1].id,
	},
	{
		dateTime: mockSelectedDates[0].getTime(),
		participant: mockParticipants[2].id,
	},
	{
		dateTime: mockSelectedDates[0].getTime(),
		participant: mockParticipants[3].id,
	},
	{
		dateTime: mockSelectedDates[1].getTime(),
		participant: mockParticipants[3].id,
	},
]

const mockConfirmedList = [
	mockParticipants[0].id,
	mockParticipants[1].id,
	mockParticipants[2].id,
	mockParticipants[3].id,
]

// * Unused
const mockSummaryData = [
	{
		monthName: "febrero",
		monthIndex: 1,
		selectedDates: [
			{
				date: 7,
				confirmedList: mockConfirmedList,
				ratio: mockConfirmedList.length / mockParticipants.length,
			},
			{
				date: 8,
				confirmedList: [],
				ratio: 0,
			},
		],
	},
	{
		monthName: "marzo",
		monthIndex: 2,
		selectedDates: [
			{
				date: 1,
				confirmedList: [],
				ratio: 0,
			},
			{
				date: 9,
				confirmedList: [],
				ratio: 0,
			},
			{
				date: 10,
				confirmedList: [],
				ratio: 0,
			},
		],
	},
]

export {
	mockSelectedDates,
	mockParticipants,
	mockConfirmedData,
	mockSummaryData,
}
