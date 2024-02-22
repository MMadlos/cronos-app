export default function TableData({ headers, onClick, isSelected }) {
	return (
		<td colSpan="1" rowSpan="1" headers={headers} className="text-center">
			<button
				onClick={onClick}
				data-selected={isSelected}
				className="w-full text-2xl text-zinc-200 hover:text-zinc-300 data-[selected=true]:text-green-500 data-[selected=true]:hover:text-green-300"
			>
				<i className="fa-solid fa-circle-check " />
			</button>
		</td>
	)
}
