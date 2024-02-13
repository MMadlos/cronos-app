export default function MonthContainer({ monthName, children, className }) {
	return (
		<div className={className}>
			<h3 className="py-2 font-semibold text-zinc-400">{monthName}</h3>
			{children}
		</div>
	)
}
