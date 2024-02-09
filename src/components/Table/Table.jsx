import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ selectedDates, participants }) {
	return (
		<div className=" max-h-[40vh] w-full  overflow-x-auto overflow-y-auto rounded-lg bg-white pb-4 pr-4">
			<table id="table" className="w-full border-collapse bg-white ">
				<TableHead selectedDates={selectedDates} />
				<TableBody
					peopleList={participants}
					selectedDates={selectedDates}
				/>
			</table>
		</div>
	)
}
