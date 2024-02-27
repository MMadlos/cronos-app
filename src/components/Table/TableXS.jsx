import { useContext, useState } from "react"
import { ParticipantsContext, SelectedDatesContext } from "../../App"
import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"

import { mockSelectedPerson } from "../../mockData"

export default function TableXS({ confirmed, onClickConfirm }) {
	const { participants } = useContext(ParticipantsContext)
	const { selectedDates } = useContext(SelectedDatesContext)

	const [selectedPerson, setSelectedPerson] = useState(mockSelectedPerson)
	const [isListOpen, setListOpen] = useState(selectedPerson === undefined)

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

	// TODO - Revisar proceso cuando se eliminan tanto fechas como participantes
	// No ocurre si sólo se cambia un parámetro.
	confirmed.forEach((confirmation) => {
		const { id, dateTime } = confirmation
		mappedConfirmation[id].push(dateTime)
	})

	return (
		<>
			<div className="flex flex-col gap-2 rounded-md border bg-white p-2">
				{selectedPerson !== undefined && (
					<button
						className="flex flex-row items-center justify-between rounded bg-zinc-100 px-4 py-2 text-zinc-400 data-[open=false]:bg-white data-[open=false]:font-semibold data-[open=false]:text-violet-800"
						onClick={() => setListOpen(!isListOpen)}
						data-open={isListOpen}
					>
						{selectedPerson.name}
						{isListOpen && <i className="fa-solid fa-chevron-up" />}
						{!isListOpen && (
							<i className="fa-solid fa-chevron-right" />
						)}
					</button>
				)}

				{isListOpen && selectedPerson === undefined && (
					<div className="rounded bg-zinc-100 px-4 py-2 text-zinc-400">
						<p>Selecciona participante</p>
					</div>
				)}

				{isListOpen && (
					<div className="flex flex-col gap-2 divide-y">
						{participants.map((personData) => {
							const { id, name } = personData

							return (
								<button
									className="px-2 py-2 text-left data-[selected=true]:font-bold data-[selected=true]:text-violet-700"
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
				)}
			</div>

			{!isListOpen && selectedPerson !== undefined && (
				<div className="mt-2 flex flex-col  gap-2 rounded-md border bg-white pb-8">
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
