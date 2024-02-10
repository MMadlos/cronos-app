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
		dateTime: 1707260400000,
		participant: mockParticipants[0].id,
	},
	{
		dateTime: 1707260400000,
		participant: mockParticipants[1].id,
	},
	{
		dateTime: 1707260400000,
		participant: mockParticipants[2].id,
	},
	{
		dateTime: 1707260400000,
		participant: mockParticipants[3].id,
	},
]

const mockSummaryData = {
	febrero: {
		monthIndex: 1,
		selectedDates: [
			{
				date: 7,
				confirmedList: [],
				ratio: 0,
			},
			{
				date: 8,
				confirmedList: [],
				ratio: 0,
			},
		],
	},
	marzo: {
		monthIndex: 2,
		selectedDates: [
			{
				date: 20,
				confirmedList: [],
				ratio: 0,
			},
			{
				date: 21,
				confirmedList: [],
				ratio: 0,
			},
		],
	},
}

/*
const mockSummaryData = [
	{
		monthName: febrero,
		monthIndex: 1,
		selectedDates: [
			{
				date: 7,
				confirmedList: [],
				ratio: 0,
			},
			{
				date: 8,
				confirmedList: [],
				ratio: 0,
			},
		]
	},
	{
		monthName: marzo,
		monthIndex: 2,
		selectedDates: [
			{
				date: 20,
				confirmedList: [],
				ratio: 0,
			},
			{
				date: 21,
				confirmedList: [],
				ratio: 0,
			},
		],
	}
]

*/

export { mockSelectedDates, mockParticipants, mockConfirmedData }
