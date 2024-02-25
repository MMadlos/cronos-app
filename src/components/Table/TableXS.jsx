import { useContext, useState } from "react"
import { ParticipantsContext, SelectedDatesContext } from "../../App"
import { getIntlMonthLong, getIntlWeekdayShort } from "../../utils"
import { Fragment } from "react"
import UserList from "../UserList/UserList"

// confirmed => [...{id, dateTime}]

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
			<button onClick={() => setListOpen(!isListOpen)}>
				{selectedPerson?.name ?? "Select participant"}
			</button>
			{isListOpen && (
				<div className="flex flex-col gap-2">
					<button
						className="p-2 text-left"
						onClick={() => {
							setSelectedPerson(undefined)
							setListOpen(false)
						}}
					>
						Select participant
					</button>
					{participants.map((personData) => {
						const { id, name } = personData

						return (
							<button
								className="rounded-sm border p-2 text-left"
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
			{!isListOpen && (
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
