export default function CalendarProcess({ children }) {
	return (
		<div className="container mx-auto mt-20 h-full w-[600px]">
			<div
				className="flex h-[60%] items-center justify-center rounded-xl bg-zinc-100  
        p-6"
			>
				{children}
			</div>
		</div>
	)
}
