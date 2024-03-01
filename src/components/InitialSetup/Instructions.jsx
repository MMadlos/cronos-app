export default function Instructions({ onClick }) {
	return (
		<div className="flex max-w-[600px] flex-col gap-12 rounded-md bg-white p-6 shadow-md  ">
			<h3 className="text-lg font-medium text-stone-700">
				Crea una tabla en 3 pasos para anotar y detectar de un vistazo
				la mejor fecha para los participantes de tu evento.
			</h3>
			<section className="flex h-full flex-col pb-10">
				<Step num="1" text="Selecciona fechas" />
				<StepLineV />
				<Step num="2" text="Añade participantes" />
				<StepLineV />
				<Step num="3" text="Confirma disponibilidad" />
			</section>
			<button
				className="hidden w-full rounded-md bg-gradient-to-br from-blue-700 via-violet-600 to-purple-700 px-8 py-3 font-semibold text-zinc-50 hover:opacity-50 sm:block sm:w-fit "
				onClick={onClick}
			>
				Empezar
			</button>
		</div>
	)
}

function Step({ num, text }) {
	return (
		<div className="flex flex-row items-center gap-4">
			<div className="bg-stone-1 flex size-9 items-center justify-center rounded-full border-2 border-stone-200">
				<p className=" text-sm font-semibold text-stone-700">{num}</p>
			</div>
			<p className="font-medium text-stone-700">{text}</p>
		</div>
	)
}

function StepLineV() {
	return <div className="ml-[1.125rem] h-4 w-[2px] bg-stone-200"></div>
}
