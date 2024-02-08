export default function CalendarProcess({ children }) {
	return (
		<main className="h-full">
			<h2 className="text-left text-lg font-semibold text-zinc-400">
				Calendario
			</h2>
			<div
				className="flex h-[50vh] items-center justify-center gap-8 rounded-xl  
        bg-zinc-50 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6"
			>
				{children}
			</div>
		</main>
	)
}
