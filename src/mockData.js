const mockSelectedDates = [
	new Date(2024, 1, 2),
	new Date(2024, 1, 3),
	new Date(2024, 1, 7),
	new Date(2024, 1, 8),
]

const mockParticipants = [
	{ id: crypto.randomUUID(), name: "Participant 1" },
	{ id: crypto.randomUUID(), name: "Participant 2" },
	{ id: crypto.randomUUID(), name: "Participant 3" },
	{ id: crypto.randomUUID(), name: "Participant 4" },
]

export { mockSelectedDates, mockParticipants }
