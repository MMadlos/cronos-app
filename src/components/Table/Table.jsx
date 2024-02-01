import TableData from "./TableData"

export default function Table({ dates, participants }) {
	return (
		<div className="bg-zinc-200 p-8">
			<table className="rounded-3xl bg-zinc-50 ">
				<caption>Calendar grid with participants</caption>
				<thead>
					<tr>
						<th id="participants">Participants</th>
						<th id="Feb-1">Feb 1</th>
						<th id="Feb-2">Feb 2</th>
						<th id="Feb-5">Feb 5</th>
						<th id="Feb-6">Feb 6</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th id="participant-1" headers="participants">
							Participant 1
						</th>
						<TableData thID="Feb-1 participant-1" />
						<TableData thID="Feb-2 participant-1" />
						<TableData thID="Feb-5 participant-1" />
						<TableData thID="Feb-6 participant-1" />
					</tr>
					<tr>
						<th scope="row">Participant 2</th>
						<td>Unknown</td>
						<td>Unknown</td>
						<td>Unknown</td>
						<td>Unknown</td>
					</tr>
					<tr>
						<th scope="row">Participant 3</th>
						<td>Unknown</td>
						<td>Unknown</td>
						<td>Unknown</td>
						<td>Unknown</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
