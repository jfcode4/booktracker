deletebook.addEventListener('click', (event) => {
	fetch(`/book/${rowid}`, {method: "DELETE"}).then(response => {
		console.log("Deleted")
		location.href = '/'
	})
})

function keypressed(event) {
	if (event.key == 'Enter') {
		const progress = inputbox.value
		fetch(`/book/${rowid}?progress=${progress}`, {method: "PUT"}).then(response => {
			console.log("Updated")
		})
	}
}
