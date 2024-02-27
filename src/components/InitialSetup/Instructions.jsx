export default function Instructions({ onClickAddCalendar }) {
	return (
		<div className="flex max-w-[600px]  flex-col gap-8 rounded-md bg-white p-6 shadow-md">
			<h3 className="text-lg font-medium">
				Crea una tabla en 3 pasos para anotar y detectar de un vistazo
				la mejor fecha para los participantes de tu evento.
			</h3>
			<section className="flex h-full flex-col gap-4">
				<Step num="1" text="Selecciona fechas" />
				<Step num="2" text="Añade participantes" />
				<Step num="3" text="Confirma la disponibilidad" />
			</section>
			<button
				className="w-full rounded-md bg-gradient-to-br from-blue-700 via-purple-700 to-pink-400 px-8 py-3 font-semibold text-zinc-50 hover:opacity-50 sm:w-fit "
				onClick={onClickAddCalendar}
			>
				Empezar
			</button>
		</div>
	)
}

function Step({ num, text }) {
	return (
		<div className="flex flex-row items-center gap-4">
			<div className="flex size-9 items-center justify-center rounded-full border border-zinc-300 ">
				<p className=" font-bold text-zinc-900">{num}</p>
			</div>
			<p className="font-semibold text-zinc-900">{text}</p>
		</div>
	)
}
