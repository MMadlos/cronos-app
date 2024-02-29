export default function SetupContainer({ children }) {
	return (
		<div className="flex h-full w-full flex-col items-center p-2 backdrop-blur-sm">
			{children}
		</div>
	)
}
