deletebook.addEventListener('click', (event) => {
	fetch(`/book/${rowid}`, {method: "DELETE"}).then(response => {
		console.log("Deleted")
		location.href = '/'
	})
})
