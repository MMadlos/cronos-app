export default function SetupContainer({ children }) {
	return (
		<div className="flex h-full w-full flex-col items-center p-2 pt-10 backdrop-blur-sm sm:mx-auto sm:h-[90%] sm:w-[70%] sm:justify-center sm:rounded-md sm:bg-white/50 sm:backdrop-blur-2xl">
			{children}
		</div>
	)
}
