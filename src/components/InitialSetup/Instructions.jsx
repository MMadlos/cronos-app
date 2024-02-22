export default function Instructions({ onClickAddCalendar }) {
	return (
		<div className="flex max-w-[600px] grow flex-col gap-8 rounded-md bg-white p-6 shadow-lg">
			<h3 className="font-medium underline underline-offset-4">
				Instrucciones
			</h3>
			<section className="flex flex-col gap-4">
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-8 items-center justify-center rounded-full bg-zinc-900">
						<p className=" font-bold text-zinc-50">1</p>
					</div>
					<p>Selecciona las posibles fechas</p>
				</div>
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-8 items-center justify-center rounded-full bg-zinc-900">
						<p className=" font-bold text-zinc-50">2</p>
					</div>
					<p>Añade los participantes a la lista</p>
				</div>
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-8 items-center justify-center rounded-full bg-zinc-900">
						<p className=" font-bold text-zinc-50">3</p>
					</div>
					<p>Confirma la disponibilidad de los participantes</p>
				</div>
			</section>
			<button
				className="w-fit rounded-md bg-gradient-to-br from-blue-700 via-purple-700 to-pink-400 px-8 py-2 font-semibold text-zinc-50 hover:opacity-50"
				onClick={onClickAddCalendar}
			>
				Empezar
			</button>
		</div>
	)
}
