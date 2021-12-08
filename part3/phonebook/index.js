const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
))
app.use(cors())

const phoneBook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const validate = (name, number) => {
  if (!name) return 'name missing'
  if (!number) return 'number missing'
  if (phoneBook.find(person => person.name == name)) return 'name must be unique'
  return false;
}

app.get('/api/persons', (req, res) => {
  res.json(phoneBook)
})

app.get('/info', (req, res) => {
  const document = `<p>Phonebook has info on ${phoneBook.length} people</p>
  <p>${new Date()}</p>`
  res.header('Content-Type', 'text/html').send(document)
})

app.get('/api/persons/:id', (req, res) => {
  res.json(phoneBook.find(person => person.id == req.params.id))
})

app.delete('/api/persons/:id', (req, res) => {
  phoneBook.splice(phoneBook.findIndex(person => person.id == req.params.id), 1)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  const error = validate(name, number)
  if (error) 
    return res.status(400).json({ error })
  const newPerson = { id: Math.floor(Math.random() * 10_000), name, number }
  phoneBook.push(newPerson)
  res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})