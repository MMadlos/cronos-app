export default function Progress({ stage }) {
	return (
		<div
			className="group flex flex-row items-center justify-center gap-2 py-2 sm:gap-4"
			data-stage={stage}
		>
			<span className="flex size-5 items-center justify-center rounded-full bg-violet-700 p-4 font-semibold text-violet-50 group-data-[stage=list]:bg-zinc-900  sm:size-10">
				1
			</span>
			<p className="text-nowrap font-semibold text-violet-700 group-data-[stage=list]:text-zinc-900">
				Fechas
			</p>
			<div className="h-[2px] w-full bg-zinc-300 sm:w-12"></div>
			<span className="flex size-5 items-center justify-center rounded-full bg-zinc-200 p-4 font-semibold text-zinc-400 group-data-[stage=list]:bg-violet-700 group-data-[stage=list]:text-violet-50 sm:size-10">
				2
			</span>
			<p className="text-nowrap font-medium text-zinc-400 group-data-[stage=list]:font-semibold group-data-[stage=list]:text-violet-700">
				Participantes
			</p>
		</div>
	)
}
