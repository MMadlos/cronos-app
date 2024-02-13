import SummaryCalendarWeekdays from "./SummaryCalendarWeekdays"
import MonthContainer from "./MonthContainer"
import GridContainer from "./GridContainer"
import SumCalDates from "./SumCalDates"

export default function SummaryCalendar({ summaryData }) {
	return (
		<div
			id="summary-calendar"
			className="flex flex-col gap-4 divide-y-2 divide-zinc-200 rounded-md border-2 border-zinc-300 bg-white p-2"
		>
			{summaryData.map((monthData) => {
				const { monthName } = monthData

				return (
					<MonthContainer key={monthName} monthName={monthName}>
						<GridContainer>
							<SummaryCalendarWeekdays />
							<SumCalDates monthData={monthData} />
						</GridContainer>
					</MonthContainer>
				)
			})}
		</div>
	)
}
