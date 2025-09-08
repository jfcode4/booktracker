import express from 'express'
import pug from 'pug'
import Database from 'bun:sqlite'

const app = express()
const db = new Database(':memory:')

function setup_db() {
	db.query('CREATE TABLE books (name TEXT, pages INT, progress INT DEFAULT 0)').run()
	add_book('Genesis', 50)
	add_book('Exodus', 40)
}

function add_book(name, pages) {
	const book = db.query('INSERT INTO books(name, pages) VALUES (?, ?) RETURNING rowid,*').get(name, pages)
	return book
}

function setup_routing() {
	app.use(express.static('public'))

	app.get('/', (req, res) => {
		const books = db.query('SELECT rowid,* FROM books').all()
		res.send(pug.renderFile('templates/home.pug', {books: books}))
	})

	app.get('/book/:id', (req, res) => {
		const book_id = req.params['id']
		//const book = books[book_id]
		const book = db.query('SELECT rowid,* FROM books WHERE rowid=?').get(book_id)
		if (!book) {
			res.status(404).send("Book not found")
			return
		}
		res.send(pug.renderFile('templates/book.pug', {book: book}))
	})

	app.post('/book', (req, res) => {
		const name = req.query['name']
		const pages = req.query['pages']
		if (name) {
			const book = add_book(name, pages)
			res.status(201)
			res.send(book)
		} else {
			res.status(400).end()
		}
	})

	app.delete('/book/:id', (req, res) => {
		const book_id = req.params['id']
		db.query('DELETE FROM books WHERE rowid=?').run(book_id)
		res.status(204).end()
	})
}


setup_db()
setup_routing()

app.listen(3000, () => {
	console.log('running on http://localhost:3000')
})
