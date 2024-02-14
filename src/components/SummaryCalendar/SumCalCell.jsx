export default function SumCalCell({ content, dataType }) {
	// dataType = weekday | full | part | none | ns

	return (
		<div
			className="group flex size-10 items-center justify-center"
			data-type={dataType}
		>
			<div className="flex size-8 items-center justify-center rounded-full group-data-[type=full]:bg-green-300 group-data-[type=none]:bg-zinc-200 group-data-[type=part]:bg-yellow-500">
				<span className="font-semibold text-zinc-800 group-data-[type=ns]:font-normal group-data-[type=weekday]:font-normal group-data-[type=ns]:text-zinc-300 group-data-[type=weekday]:text-zinc-500">
					{content}
				</span>
			</div>
		</div>
	)
}
