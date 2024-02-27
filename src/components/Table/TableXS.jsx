import { useContext, useState } from "react"
import { ParticipantsContext, SelectedDatesContext } from "../../App"
import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"
import { Fragment } from "react"

export default function TableXS({ confirmed, onClickConfirm }) {
	const { participants } = useContext(ParticipantsContext)
	const { selectedDates } = useContext(SelectedDatesContext)

	const [selectedPerson, setSelectedPerson] = useState(undefined)
	const [isListOpen, setListOpen] = useState(true)

	const mappedDates = {}
	selectedDates.forEach((dateTime) => {
		const date = new Date(dateTime)
		const monthName = getIntlMonthLong(date)

		if (mappedDates[monthName] === undefined) mappedDates[monthName] = []
		mappedDates[monthName].push(dateTime)
	})

	const mappedConfirmation = {}
	participants.forEach((participant) => {
		const { id } = participant
		mappedConfirmation[id] = []
	})

	confirmed.forEach((confirmation) => {
		const { id, dateTime } = confirmation
		mappedConfirmation[id].push(dateTime)
	})

	return (
		<>
			<div className="flex flex-col gap-2">
				<button
					className="flex w-full flex-row items-center justify-between rounded border-2 border-violet-700 bg-white px-4 py-2 font-semibold text-violet-700 data-[open=true]:bg-violet-50"
					onClick={() => setListOpen(!isListOpen)}
					data-open={isListOpen}
				>
					{selectedPerson?.name ?? "Select participant"}
					{isListOpen && <i className="fa-solid fa-chevron-up" />}
					{!isListOpen && <i className="fa-solid fa-chevron-right" />}
				</button>

				{isListOpen && (
					<>
						<div className="flex flex-col justify-center gap-2 divide-y rounded bg-white p-4">
							{participants.map((personData) => {
								const { id, name } = personData

								return (
									<button
										className="rounded-sm px-2 py-4 text-left data-[selected=true]:font-bold data-[selected=true]:text-violet-700"
										data-selected={
											selectedPerson?.id === id
										}
										key={id}
										onClick={() => {
											setSelectedPerson(personData)
											setListOpen(false)
										}}
									>
										{name}
									</button>
								)
							})}
						</div>
						<div className="h-4"></div>
					</>
				)}
			</div>

			{!isListOpen && selectedPerson !== undefined && (
				<div className="my-4 flex flex-col gap-2 rounded  bg-white pb-8">
					{Object.keys(mappedDates).map((monthName) => {
						return (
							<div
								key={monthName}
								className=" flex flex-col gap-2 p-4"
							>
								<p className="my-2 text-left font-bold text-zinc-900">
									{monthName.toLocaleUpperCase()}
								</p>
								{mappedDates[monthName].map((dateTime) => {
									const weekday =
										getIntlWeekdayShort(dateTime)
									const dateData = new Date(dateTime)
									const date = dateData.getDate()

									const isSelected =
										mappedConfirmation[
											selectedPerson.id
										].includes(dateTime)

									return (
										<button
											key={dateTime}
											className="group flex w-full flex-row items-center justify-between rounded-md  bg-zinc-50 px-4 py-2  text-zinc-900 data-[selected=true]:border-violet-50 data-[selected=true]:bg-violet-50 "
											data-selected={isSelected}
											onClick={() =>
												onClickConfirm(
													selectedPerson.id,
													dateTime
												)
											}
										>
											<p className="group-data-[selected=true]:font-semibold group-data-[selected=true]:text-violet-700">{`${weekday} ${date}`}</p>

											<i className="fa-solid fa-circle-check text-2xl text-zinc-300 group-data-[selected=true]:text-green-500 " />
										</button>
									)
								})}
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}
