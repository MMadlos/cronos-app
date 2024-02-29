export default function SetupContainer({ children, stage }) {
	return (
		<div
			className="flex h-full w-full flex-col items-center p-2 backdrop-blur-sm data-[stage=calendar]:pt-10 sm:mx-auto sm:h-[90%] sm:w-[70%] sm:justify-center sm:rounded-md sm:bg-white/50 sm:backdrop-blur-2xl"
			data-stage={stage}
		>
			{children}
		</div>
	)
}
