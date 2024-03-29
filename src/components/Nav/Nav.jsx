export default function Nav({ onClickClose }) {
	return (
		<nav className="fixed top-0 z-10 flex h-screen max-h-screen flex-col gap-2  bg-zinc-50 p-6 md:right-0 md:w-[20vw]">
			<div className="mx-auto w-fit">
				<button
					className=" rounded-full bg-zinc-200 px-6 py-4 hover:bg-violet-200"
					onClick={onClickClose}
				>
					<i className="fa-solid fa-xmark text-zinc-800" />
				</button>
			</div>
			<div className="flex h-full flex-col justify-between gap-10 md:justify-normal">
				<div>
					<h2 className="mb-2 text-xl font-medium">About</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Magni inventore beatae deleniti assumenda
						aspernatur debitis repudiandae sunt nihil odio!
						Blanditiis asperiores mollitia labore? Eveniet placeat
						ipsa aspernatur voluptatibus numquam facilis!
					</p>
				</div>

				<div>
					<h2 className="mb-2 text-xl font-medium">Credits</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Deleniti rerum nobis reprehenderit laudantium distinctio
						officiis, repudiandae labore dolor. Labore unde
						blanditiis assumenda sit temporibus corrupti dolores
						voluptas neque quo sunt!
					</p>
				</div>

				<div className="flex flex-row items-center justify-between gap-4 md:h-full md:items-end">
					<button>LinkedIn</button>
					<button>Github</button>
					<button>Portfolio</button>
				</div>
			</div>
		</nav>
	)
}
