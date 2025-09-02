//

const express = require("express");
const morgan = require("morgan");
const app = express();

let persons = [
        {
                id: "1",
                name: "Arto Hellas",
                number: "040-123456",
        },
        {
                id: "2",
                name: "Ada Lovelace",
                number: "39-44-5323523",
        },
        {
                id: "3",
                name: "Dan Abramov",
                number: "12-43-234345",
        },
        {
                id: "4",
                name: "Mary Poppendieck",
                number: "39-23-6423122",
        },
];

app.use(express.json());

morgan.token("body", (req) => {
        return JSON.stringify(req.body);
});

app.use(
        morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons/", (request, response) => {
        response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
        const id = request.params.id;
        const person = persons.find((p) => p.id === id);
        if (person) response.json(person);
        else response.status(404).end();
});

app.get("/info/", (request, response) => {
        response.send(
                `
                <p>Phonebook has info for ${persons.length} people <p>
                <p>${new Date().toString()}<p>
        `,
        );
});

app.delete("/api/persons/:id", (request, response) => {
        const id = request.params.id;

        if (persons.find((p) => p.id === id)) {
                persons = persons.filter((p) => p.id !== id);
                response.status(204).end();
        } else response.status(404).end();
});

function genId() {
        return String(Math.floor(Math.random() * 2132141241));
}

function isUniqueName(name) {
        return !persons.find((p) => p.name === name) ? true : false;
}

app.post("/api/persons/", (request, response) => {
        const body = request.body;

        if (!body.name || !body.number) {
                return response.status(400).json({
                        error: `missing ${!body.name && !body.number ? "name and number" : !body.name ? "name" : "number"}`,
                });
        }
        if (!isUniqueName(body.name))
                return response.status(400).json({ error: "name must be unique" });
        const newPerson = { ...body, id: genId() };
        persons.push(newPerson);
        response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
});
