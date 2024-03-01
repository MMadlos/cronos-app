import { getIntlMonthLong } from "../../utils"

const dateToday = new Date()
const currentYear = dateToday.getFullYear()
const currentMonthIndex = dateToday.getMonth()

export default function DatePickerHeader({ calendar, onClickArrow }) {
	const { year, monthIndex } = calendar
	const monthName = getIntlMonthLong(new Date(year, monthIndex))

	return (
		<div
			id="calendar-header"
			className="flex flex-col items-center sm:gap-2"
		>
			<h4 className="text-sm font-medium text-stone-400">{year}</h4>
			<div className="flex w-full flex-row items-center justify-between">
				<button
					className="group"
					data-index={monthIndex - 1}
					disabled={
						monthIndex - 1 < currentMonthIndex &&
						year === currentYear
					}
					onClick={onClickArrow}
				>
					<i
						className={`fa-solid fa-arrow-left text-2xl text-stone-700 group-enabled:hover:opacity-50 group-disabled:text-stone-200 sm:p-2`}
					/>
				</button>
				<div className="rounded  px-6 py-2 ">
					<h3 className="text-xl font-semibold text-stone-600 sm:text-2xl">
						{monthName}
					</h3>
				</div>

				<button
					className="group"
					data-index={monthIndex + 1}
					onClick={onClickArrow}
				>
					<i
						className={`fa-solid fa-arrow-right text-2xl text-stone-700 hover:opacity-50 group-disabled:text-stone-200 sm:p-2`}
					/>
				</button>
			</div>
		</div>
	)
}
