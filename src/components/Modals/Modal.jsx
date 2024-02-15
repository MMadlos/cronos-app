import { useState, useRef, useEffect } from "react"

const isClickInsideDialog = (e, element) => {
	const r = element.getBoundingClientRect()

	return (
		e.clientX > r.left &&
		e.clientX < r.right &&
		e.clientY > r.top &&
		e.clientY < r.bottom
	)
}

export default function Modal({ buttonName, children }) {
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

	return (
		<div>
			<button
				className="h-full w-full rounded px-2 py-1 text-left hover:bg-zinc-100 hover:text-zinc-600"
				onClick={handleOpen}
			>
				<i className="fa-solid fa-pen mr-2" />
				{buttonName}
			</button>

			<dialog
				ref={dialogRef}
				className="size-1/2 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400"
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
				<div className="flex h-full items-center">{children}</div>
			</dialog>
		</div>
	)
}
