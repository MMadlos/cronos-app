import SummaryCalendarWeekdays from "./SummaryCalendarWeekdays"
import MonthContainer from "./MonthContainer"
import GridContainer from "./GridContainer"
import SumCalDates from "./SumCalDates"

export default function SummaryCalendar({ summaryData }) {
	return (
		<div
			id="summary-calendar"
			className="flex max-h-[750px] min-w-[350px] flex-col  gap-4 overflow-y-auto rounded-md border-2 border-zinc-300 bg-white px-4 py-4"
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
