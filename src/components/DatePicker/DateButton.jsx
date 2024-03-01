export default function DateButton({ data, onClick }) {
	const { content, type } = data
	const isDisabled = ["empty", "unavailable"].includes(type)

	return (
		<button
			onClick={onClick}
			data-type={type}
			className="flex size-10 items-center justify-center rounded-md bg-stone-50 font-medium enabled:hover:bg-stone-200 disabled:text-stone-300 data-[type=selected]:border-stone-200 data-[type=selected]:bg-stone-900 data-[type=selected]:font-medium data-[type=selected]:text-stone-50 data-[type=selected]:hover:bg-stone-500 md:bg-stone-100"
			disabled={isDisabled}
			data-date={isDisabled ? null : content}
		>
			{content}
		</button>
	)
}
