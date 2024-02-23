import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table() {
	return (
		<div className="mt-6 max-h-[60vh] w-full overflow-x-auto overflow-y-auto">
			<table id="table" className="w-full border-collapse bg-white">
				<TableHead />
				<TableBody />
			</table>
		</div>
	)
}
