export default function Header({ onClickOpenNav }) {
	return (
		<header className="w-full bg-white">
			<div className="flex flex-row items-center justify-between px-4 py-2 sm:mx-auto sm:w-[70%] sm:px-0">
				<h1 className="font-passionOne bg-gradient-to-br from-blue-600 via-violet-600 to-purple-950 bg-clip-text text-4xl uppercase text-transparent">
					Cronos
				</h1>
				<button
					className="grid size-8 place-items-center"
					onClick={onClickOpenNav}
				>
					<span className="hidden text-lg font-medium underline underline-offset-8 hover:text-violet-600 sm:block">
						Info
					</span>
					<i className="fa-solid fa-bars text-2xl sm:hidden" />
				</button>
			</div>
		</header>
	)
}
