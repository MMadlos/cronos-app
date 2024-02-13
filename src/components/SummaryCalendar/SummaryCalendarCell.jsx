export default function SummaryCalendarCell({
	day,
	isSelected = false,
	ratioType,
}) {
	return (
		<div className="flex size-10 items-center justify-center">
			{isSelected ? (
				<SelectedCalendarCell day={day} ratioType={ratioType} />
			) : (
				<CalendarCell day={day} />
			)}
		</div>
	)
}

function CalendarCell({ day }) {
	return (
		<div className="flex size-8 items-center justify-center rounded-full ">
			<span className="text-zinc-300">{day}</span>
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
		<div
			className={`${classes[ratioType]} flex size-8 items-center justify-center rounded-full `}
		>
			<span className=" font-bold text-zinc-800">{day}</span>
		</div>
	)
}
