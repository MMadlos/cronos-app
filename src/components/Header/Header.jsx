export default function Header() {
	// TODO: edit image by selecting from unsplash or uploading file
	return (
		<header className="h-[20vh] max-h-[35vh] w-full sm:h-[20vh]">
			<div>
				<h1 className="font-passionOne text-2xl">Cronos</h1>
			</div>
			<img
				src="src/images/header-calendar2.jpg"
				alt="an image with party elements"
				className="h-full w-full object-cover object-center "
			/>
		</header>
	)
}
