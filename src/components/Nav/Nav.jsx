import { useState } from "react"
import SummaryCalendar from "../SummaryCalendar/SummaryCalendar"

export default function Nav({ summaryData }) {
	const [openNav, setOpenNav] = useState(false)

	return (
		<div
			className=" border-r-2 border-zinc-200 bg-zinc-50 p-2"
			id="aside-nav"
		>
			{openNav ? (
				<>
					<div className="flex flex-row items-center justify-between">
						<h2 className="my-2 text-zinc-400">Summary</h2>
						<button
							className="size-8 rounded hover:bg-zinc-200"
							onClick={() => setOpenNav(false)}
						>
							<i className="fa-solid fa-circle-chevron-left text-xl text-zinc-500 " />
						</button>
					</div>
					<SummaryCalendar summaryData={summaryData} />
				</>
			) : (
				<button
					className="size-8 rounded hover:bg-zinc-200"
					onClick={() => setOpenNav(true)}
				>
					<i className="fa-solid fa-circle-chevron-right text-xl text-zinc-500 " />
				</button>
			)}
		</div>
	)
}
