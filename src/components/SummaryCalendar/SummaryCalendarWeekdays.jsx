import { getWeekdays } from "../../utils"

export default function SummaryCalendarWeekdays() {
	const weekDays = getWeekdays()

	return (
		<div className="grid grid-cols-7 gap-2 rounded-md  bg-zinc-50 p-1">
			{weekDays.map((weekday) => {
				return (
					<div className="flex size-10 items-center justify-center">
						<div className="flex size-8 items-center justify-center rounded-full ">
							<span className="text-zinc-500">{weekday}</span>
						</div>
					</div>
				)
			})}
		</div>
	)
}
