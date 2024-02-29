export default function Header() {
	// TODO: edit image by selecting from unsplash or uploading file
	return (
		<header className="w-full bg-white">
			<div className="flex flex-row items-center justify-between px-4 py-2">
				<h1 className="font-passionOne bg-gradient-to-br from-blue-600 via-violet-600 to-purple-950 bg-clip-text text-4xl uppercase text-transparent">
					Cronos
				</h1>
				<div className="grid size-8 place-items-center">
					<i className="fa-solid fa-bars text-2xl" />
				</div>
			</div>
		</header>
	)
}
