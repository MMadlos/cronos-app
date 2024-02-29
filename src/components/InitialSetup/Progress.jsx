import { calendarProcess } from "../../App"

export default function Progress({ stage }) {
	const content = {
		[calendarProcess.pickDates]: {
			step: "1",
			text: "Fechas",
		},
		[calendarProcess.peopleList]: {
			step: "2",
			text: "Participantes",
		},
	}

	return (
		<div
			className="flex w-full flex-row items-center justify-start gap-2 p-4 sm:gap-4"
			data-stage={stage}
		>
			<span className="flex size-5 items-center justify-center rounded-full bg-zinc-700 p-4 font-semibold text-zinc-50  sm:size-10">
				{content[stage].step}
			</span>
			<p className="text-nowrap font-semibold text-zinc-700 group-data-[stage=list]:text-zinc-900">
				{content[stage].text}
			</p>
		</div>
	)
}
