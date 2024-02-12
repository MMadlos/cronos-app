import SummaryCalendarGrid from "./SummaryCalendarGrid"

export default function SummaryCalendar({ summaryData }) {
	return (
		<div className="p-4">
			<div
				id="summary-calendar"
				className="flex min-h-[200px] w-full flex-col gap-4 rounded-md border-2 border-zinc-800 bg-white p-2"
			>
				{summaryData.map((monthData) => {
					const { monthName } = monthData

					return (
						<div key={monthName} className="border border-blue-500">
							<h3 className="text-center">{monthName}</h3>
							<SummaryCalendarGrid monthData={monthData} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
