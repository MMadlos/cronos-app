import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ selectedDates, participants }) {
	const formattedDates = selectedDates.map((dateTime) => new Date(dateTime))

	return (
		<div className="mt-6 overflow-x-auto overflow-y-auto">
			<table id="table" className="border-collapse bg-white">
				<TableHead selectedDates={formattedDates} />
				<TableBody
					peopleList={participants}
					selectedDates={formattedDates}
				/>
			</table>
		</div>
	)
}
