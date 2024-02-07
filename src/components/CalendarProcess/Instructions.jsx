export default function Instructions({ onClickAddCalendar }) {
	return (
		<>
			<h3 className="font-medium underline underline-offset-4">
				Añade los participantes y las fechas
			</h3>
			<section className="flex flex-col gap-4">
				<div className="flex flex-row items-center gap-4">
					<div className="flex size-8 items-center justify-center rounded-full bg-zinc-900">
						<p className=" font-bold text-zinc-50">1</p>
					</div>
					<p>
						Selecciona las posibles fechas para que los
						participantes escojan su disponibilidad
					</p>
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
					<p>
						Selecciona las fechas en la que tus participantes tienen
						disponibilidad
					</p>
				</div>
			</section>
			<button
				className="rounded-md bg-zinc-900 px-8 py-2 font-semibold text-zinc-50 hover:opacity-50"
				onClick={onClickAddCalendar}
			>
				Añadir calendario
			</button>
		</>
	)
}
