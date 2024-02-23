import { useState, useRef, useEffect } from "react"
import DatePicker from "../Calendar/DatePicker"
import UserList from "../UserList/UserList"

const isClickInsideDialog = (e, element) => {
	const r = element.getBoundingClientRect()

	return (
		e.clientX > r.left &&
		e.clientX < r.right &&
		e.clientY > r.top &&
		e.clientY < r.bottom
	)
}

export default function Modal({ buttonName, useCase, children }) {
	const dialogRef = useRef(null)
	const closeDialogRef = useRef(null)

	const [isOpened, setIsOpened] = useState(false)

	useEffect(() => {
		if (isOpened) {
			dialogRef.current?.showModal()
			document.body.classList.add("modal-open")
			closeDialogRef.current.focus()
		} else {
			dialogRef.current?.close()
			document.body.classList.remove("modal-open")
		}
	}, [isOpened])

	const handleOpen = () => setIsOpened(true)
	const handleClose = () => setIsOpened(false)

	const handleBackdrop = (e) =>
		dialogRef.current &&
		!isClickInsideDialog(e, dialogRef.current) &&
		handleClose()

	const handleEsc = (e) => e.key === "Escape" && handleClose()

	const iconName = {
		Participants: "fa-user",
		Dates: "fa-calendar-check",
	}

	return (
		<>
			<button
				className="h-full w-full rounded px-2 py-2 text-left font-medium hover:bg-zinc-100 hover:font-semibold hover:text-zinc-600"
				onClick={handleOpen}
			>
				<i className={`fa-solid ${iconName[buttonName]} mr-3`} />
				{buttonName}
			</button>

			{isOpened && (
				<dialog
					ref={dialogRef}
					className="size-2/3 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 data-[state=false]:hidden"
					onClick={handleBackdrop}
				>
					<button
						ref={closeDialogRef}
						onClick={handleClose}
						className="absolute right-0 p-4 hover:opacity-50"
						onKeyDown={handleEsc}
					>
						<i className="fa-solid fa-xmark text-lg text-zinc-900" />
					</button>
					<div className="flex h-full items-center">
						{useCase === "DatePicker" && (
							<DatePicker onClick={handleClose} />
						)}
						{useCase === "UserList" && (
							<UserList
								onClickReturn={handleClose}
								onClickNext={handleClose}
							/>
						)}
						{children}
					</div>
				</dialog>
			)}
		</>
	)
}
