import express from 'express'
import pug from 'pug'

const app = express()

var books = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"]

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send(pug.renderFile('templates/home.pug', {books: books}))
})

app.get('/book/:id', (req, res) => {
	const book_id = req.params['id']
	const book = books[book_id]
	res.send(pug.renderFile('templates/book.pug', {book: book}))
})
app.get('/add_book', (req, res) => {
	const name = req.query['name']
	if (name) {
		books.push(name)
	}
	res.set('Content-Location', '/')
	res.send(pug.renderFile('templates/home.pug', {books: books}))
})


app.listen(3000, () => {
	console.log('running on http://localhost:3000')
})
