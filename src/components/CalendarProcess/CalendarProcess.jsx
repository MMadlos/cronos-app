export default function CalendarProcess({ children }) {
	return (
		<div className="flex h-full items-center justify-center">
			<div className=" flex h-[90%]  w-[70%] items-center justify-center rounded-lg bg-zinc-100 p-6">
				{children}
			</div>
		</div>
	)
}
