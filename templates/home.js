addbook.addEventListener('submit', (event) => {
	event.preventDefault()
	const name = addbook.elements['name'].value
	const pages = addbook.elements['pages'].value
	const params = new URLSearchParams({name: name, pages: pages})
	fetch(`/book?${params}`, {method: "POST"}).then(response => {
		response.json().then(json => {
			booklist.innerHTML += `<li><a href="/book/${json.rowid}">${json.name}</a></li>`
		})
		addbook.reset()
	})
})
