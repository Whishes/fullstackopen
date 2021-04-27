const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

morgan.token("body", (req) => {
    return "POST" === req.method
        ? JSON.stringify(req.body)
        : ""
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/", (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const info = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`

    response.send(info)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const randomId = Math.floor(Math.random() * (1001 - 1) + 1)
    return randomId
}

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Content missing"
        })
    }

    const existingPerson = persons.find(person => person.name === body.name)
    if (existingPerson) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    //console.log(person.id)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})