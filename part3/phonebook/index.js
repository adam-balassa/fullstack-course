require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
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

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.json(result.map(({ _id, name, number }) => ({ id: _id, name, number })))
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(result => {
    const document = `<p>Phonebook has info on ${result.length} people</p>
    <p>${new Date()}</p>`
    res.header('Content-Type', 'text/html').send(document)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(result => {
      if (!result) throw { name: 'NotFoundError' }
      return result.toJSON()
    })
    .then(({ id, name, number }) => res.json({ id, name, number }))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (!result) throw { name: 'NotFoundError' }
      return result.toJSON()
    })
    .then(() => res.send(204))
    .catch(err => next(err))
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body
  const person = new Person({ name, number })
  person
    .save()
    .then(response => response.toJSON())
    .then(({ id, name, number }) => res.json({ id, name, number }))
    .catch(err => next(err))
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { name, number } = req.body
  const person = { name, number }
  Person
    .findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(result => {
      if (!result) throw { name: 'NotFoundError' }
      return result.toJSON()
    })
    .then(({ id, name, number }) => res.json({ id, name, number }))
    .catch(error => next(error))
})

app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'NotFoundError')
    return response.status(404).end()

  next(error)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})