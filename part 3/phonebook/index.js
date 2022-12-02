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
const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('obj', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => { 
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
}) 

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        response.statusMessage = "the note does not exist"
        return response.status(404).end()
    }

    response.json(person)
})

app.post('/api/persons/', (request, response) => {
    const id = Math.floor((Math.random() * (1001 - 5) + 5))
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
    

    person.id = id
    persons = [...persons, person]
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})