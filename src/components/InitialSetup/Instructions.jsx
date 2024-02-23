export default function Instructions({ onClickAddCalendar }) {
	return (
		<div className="flex max-w-[600px]  flex-col gap-8 rounded-md bg-white p-6 shadow">
			<h3 className="text-xl font-medium">
				Escoge la fecha perfecta para el evento en sólo 3 pasos
			</h3>
			<section className="flex h-full flex-col gap-4">
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-9 items-center justify-center rounded-full border-2 border-zinc-900 ">
						<p className=" font-bold text-zinc-900">1</p>
					</div>
					<p className="font-bold text-zinc-900">Selecciona fechas</p>
				</div>
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-9 items-center justify-center rounded-full border-2 border-zinc-900 ">
						<p className=" font-bold text-zinc-900">2</p>
					</div>
					<p className="font-bold text-zinc-900">
						Añade participantes
					</p>
				</div>
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-9 items-center justify-center rounded-full border-2 border-zinc-900 ">
						<p className=" font-bold text-zinc-900">3</p>
					</div>
					<p className="font-bold text-zinc-900">
						Confirma la disponibilidad
					</p>
				</div>
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
