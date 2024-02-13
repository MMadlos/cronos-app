import SummaryCalendarGrid from "./SummaryCalendarGrid"
import MonthContainer from "./MonthContainer"

export default function SummaryCalendar({ summaryData }) {
	return (
		<div
			id="summary-calendar"
			className="flex flex-col gap-4 rounded-md border-2 border-zinc-300 bg-white p-2"
		>
			{summaryData.map((monthData) => {
				const { monthName } = monthData

				return (
					<MonthContainer key={monthName} monthName={monthName}>
						<SummaryCalendarGrid monthData={monthData} />
					</MonthContainer>
				)
			})}
		</div>
	)
}
