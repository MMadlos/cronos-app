const mockSelectedDates = [
	new Date(2024, 1, 2),
	new Date(2024, 1, 3),
	new Date(2024, 1, 7),
	new Date(2024, 1, 8),
	new Date(2024, 2, 1),
	new Date(2024, 2, 2),
	new Date(2024, 2, 8),
]

const mockParticipants = [
	{ id: crypto.randomUUID(), name: "Alejandro Sanz" },
	{ id: crypto.randomUUID(), name: "Shakira" },
	{ id: crypto.randomUUID(), name: "Jose Fernando Gutiérrez" },
	{ id: crypto.randomUUID(), name: "María" },
]

export { mockSelectedDates, mockParticipants }
