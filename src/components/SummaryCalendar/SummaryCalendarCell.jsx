export default function SummaryCalendarCell({
	day,
	isSelected = false,
	ratioType,
}) {
	return (
		<div className="border text-center">
			{isSelected ? (
				<SelectedCalendarCell day={day} ratioType={ratioType} />
			) : (
				<span className="text-zinc-400">{day}</span>
			)}
		</div>
	)
}

const SelectedCalendarCell = ({ day, ratioType = "none" }) => {
	const classes = {
		all: "bg-green-300",
		partial: "bg-yellow-500",
		none: "bg-zinc-200",
	}

	return (
		<span className={`font-bold text-zinc-800 ${classes[ratioType]}`}>
			{day}
		</span>
	)
}
