const express = require('express');
const app = express();
const morgan = require ('morgan');

morgan.token('body', req => {
  if(req.method==="POST"){
    return JSON.stringify(req.body)
  }
})

app.use(express.json());
app.use(morgan(':method :url :status :response-time ms :res[content-length] ch :body'));

let persons =[
  {
    id: 1,
    name: "Vicente Fernandez",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Pedro Infante",
    number: "39-44-123456"
  },
  {
    id: 3,
    name: "Juanfgdfgdf Gabriel",
    number: "12-43-123456"
  },
  {
    id: 4,
    name: "Chabela Vargas",
    number: "39-23-123456"
  },
]

app.get("/api/persons",(req, res) => {
  res.json(persons)
})

app.get("/info",(req, res) => {
  const info = persons.length;
  const date = new Date().toString();
  res.json(`Phonebook has info for ${info} people ${date}`);
})

app.get("/api/persons/:id", (req, res)=>{
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
      res.json(person)
    } else {
      res.status(404).json({ message: `Register not found with id: ${id}` })
    }
})

app.delete("/api/persons/:id",(req, res) => {
  const index = Number(req.params.id);
  const validateIndex = persons.find(element => element.id === index);
  if (!validateIndex) {
    res.status(404).json({ message: `ID does not exists` });
  } else {
    persons = persons.filter(element=> element.id !== index);
    res.json(persons);
  }
})

app.post("/api/persons",(req, res) => {
  randomIndex = Math.floor(Math.random()*10000);
  let randomPerson = req.body;
  randomPerson = {...randomPerson, "id":randomIndex};
  persons.push(randomPerson);
  if (!randomPerson.name) {
    res.status(404).json({ message: `Name is empty` })
  } else if (!randomPerson.number) {
    res.status(404).json({ message: `Number is empty` })
  } else if (persons.find(element => element.name === randomPerson.name)) {
    res.status(404).json({ message: `Name already exists` });
  } else {
    persons.push(randomPerson);
    res.json(persons);
  };
})

app.post("/api/persons/6",(req, res) => {
  const newReg = req.body;
  if (!newReg.id) {
    res.status(404).json({ message: `ID is empty` })
  } else if (!newReg.name) {
    res.status(404).json({ message: `Name is empty` })
  } else if (persons.find(element => element.name === newReg.name)) {
    res.status(404).json({ message: `Name already exists` });
  } else {
    persons.push(newReg);
    res.json(persons);
  };
})

app.patch("/api/persons/3",(req, res) => {
  persons[2].name = "Juan Gabriel"
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})