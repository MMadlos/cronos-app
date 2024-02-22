export default function Progress({ stage }) {
	return (
		<div
			className="group flex flex-row items-center justify-center gap-4 py-2"
			data-stage={stage}
		>
			<span className="flex size-10 items-center justify-center rounded-full bg-violet-700 p-4 font-semibold text-violet-50  group-data-[stage=list]:bg-zinc-900">
				1
			</span>
			<p className="font-semibold text-violet-700 group-data-[stage=list]:text-zinc-900">
				Select dates
			</p>
			<div className="h-[2px] w-12 bg-zinc-300"></div>
			<span className="flex size-10 items-center justify-center rounded-full bg-zinc-200 p-4 font-semibold text-zinc-400 group-data-[stage=list]:bg-violet-700 group-data-[stage=list]:text-violet-50">
				2
			</span>
			<p className="font-medium text-zinc-400 group-data-[stage=list]:font-semibold group-data-[stage=list]:text-violet-700">
				Add participants
			</p>
		</div>
	)
}
