

let persons =  [
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

require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('obj', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'))
app.use(express.static('build'))
app.use(cors())

app.get('/api/persons', (request, response) => {
    Person.find().then(persons => response.json(persons))
})

app.get('/info', (request, response) => { 
    Person.find().then(persons => {
        return response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
    })
}) 

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.statusMessage = "the note does not exist"
            response.status(404).end()
        }
    })
})

app.post('/api/persons/', (request, response) => {
    const person = request.body
    person.name = person.name === "" ? null : person.name
    person.number = person.number === "" ? null : person.number

    if (!(person.name && person.number)) {
        return response.status(400).json(person.name === null ? {
            error: 'name is missing'
        } : {
            error: 'number is missing'
        })
    }


    const findPerson = persons.find(personFind => personFind.name === person.name)

    if (findPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const newPerson = Person({
        name: person.name,
        number: person.number
    })
    newPerson.save().then(returnedPerson => response.json(returnedPerson))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const updatePerson = {
        name: request.body.name,
        number: request.body.number
    }

    Person.findByIdAndUpdate(id, updatePerson, {new: true})
    .then(returnedPerson => response.json(returnedPerson))
    .catch(error => next(error))
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'Malformatted ID'})
    }

    next(error)
}

app.use(errorHandler)