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
			<button
				className="sticky top-4 flex w-full flex-row items-center justify-between rounded bg-violet-700 p-4 font-semibold text-zinc-50"
				onClick={() => setListOpen(!isListOpen)}
			>
				{selectedPerson?.name ?? "Select participant"}
				{isListOpen && <i className="fa-solid fa-chevron-up" />}
				{!isListOpen && <i className="fa-solid fa-chevron-right" />}
			</button>
			{isListOpen && (
				<>
					<div className="flex flex-col justify-center gap-2 divide-y divide-violet-300 rounded bg-violet-50 p-4">
						{participants.map((personData) => {
							const { id, name } = personData

							return (
								<button
									className="rounded-sm p-4 text-left data-[selected=true]:font-bold data-[selected=true]:text-violet-700"
									data-selected={selectedPerson?.id === id}
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
			{!isListOpen && selectedPerson !== undefined && (
				<div className="flex flex-col gap-1">
					{Object.keys(mappedDates).map((monthName) => {
						return (
							<Fragment key={monthName}>
								<p className="my-2 text-center">{monthName}</p>
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
											className="group flex w-full flex-row items-center justify-between rounded-md border px-4 py-2 data-[selected=true]:border-green-500"
											data-selected={isSelected}
											onClick={() =>
												onClickConfirm(
													selectedPerson.id,
													dateTime
												)
											}
										>
											<p className="group-data-[selected=true]:font-semibold">{`${weekday} ${date}`}</p>

											<i className="fa-solid fa-circle-check text-2xl text-zinc-200 group-data-[selected=true]:text-green-500 " />
										</button>
									)
								})}
							</Fragment>
						)
					})}
				</div>
			)}
		</>
	)
}
