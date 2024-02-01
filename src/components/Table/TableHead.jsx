export default function TableHead({ formattedDates }) {
	return (
		<thead>
			<tr>
				<th id="participants"></th>
				{formattedDates.map((dates, index) => {
					const headerDate = dates.split(" ").join("-")

					return (
						<th key={index} id={headerDate}>
							{dates}
						</th>
					)
				})}
			</tr>
		</thead>
	)
}
