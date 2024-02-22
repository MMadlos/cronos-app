import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ selectedDates, participants }) {
	return (
		<div className="mt-6 overflow-x-auto overflow-y-auto">
			<table id="table" className="border-collapse bg-white">
				<TableHead />
				<TableBody
					peopleList={participants}
					selectedDates={selectedDates}
				/>
			</table>
		</div>
	)
}
