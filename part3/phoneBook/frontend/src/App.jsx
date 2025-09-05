import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form.jsx";
import DisplayPersons from "./components/DisplayPersons.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import personsService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

function App() {
        const [persons, setPersons] = useState([]);
        const [newPerson, setNewPerson] = useState({ name: "", number: "" });
        const [query, setQuery] = useState("");
        const [notification, setNotification] = useState({
                type: true,
                message: null,
        });

        useEffect(() => {
                personsService.getAll().then((initPersons) => {
                        setPersons(initPersons);
                });
        }, []);

        console.log(persons);

        const handleChange = (event) => {
                const { name, value } = event.target;
                setNewPerson({ ...newPerson, [name]: value });
        };

        function handleNotifSetting(message, type) {
                setNotification({ message, type });
                setTimeout(() => {
                        setNotification({ message: null, type: null });
                }, 5000);
        }

        const addPerson = (event) => {
                event.preventDefault();

                const newPersonObj = { ...newPerson };

                const existingPerson = persons.find((p) => p.name == newPersonObj.name);
                if (existingPerson) {
                        if (
                                newPersonObj.number != existingPerson.number &&
                                window.confirm(`${newPersonObj.name} is already added to Phonebook,
                                                Do u wanna replace old number with new one`)
                        ) {
                                newPersonObj.id = existingPerson.id;
                                personsService
                                        .update(newPersonObj.id, newPersonObj)
                                        .then((res) => {
                                                setPersons(persons.map((p) => (p.id == res.id ? res : p)));
                                                handleNotifSetting(
                                                        `changed ${existingPerson.name} number from 
                                                                        ${existingPerson.number} to ${res.number}`,
                                                        true,
                                                );
                                        })
                                        .catch((error) => {
                                                if (error.status == 404) {
                                                        handleNotifSetting(
                                                                `information of ${newPersonObj.name} has already removed from the server`,
                                                                false,
                                                        );
                                                        setPersons(persons.filter((p) => p.id != newPersonObj.id));
                                                }
                                        });
                        } else if (newPersonObj.number == existingPerson.number)
                                handleNotifSetting(
                                        ` ${newPersonObj.name} is already added in the Phonebook`,
                                        false,
                                );
                } else {
                        personsService.create(newPersonObj).then((res) => {
                                setPersons(persons.concat(res));
                        });
                        handleNotifSetting(`added ${newPersonObj.name} to the Phonebook`, true);
                }

                flushInputs();
        };

        const shownPersons = persons.filter((person) =>
                person.name.toLowerCase().includes(query.toLowerCase()),
        );

        function deletePerson(id) {
                const prsn = persons.find((p) => p.id == id);
                if (window.confirm(`Delete ${prsn.name}`))
                        personsService.delEntry(id).then((res) => {
                                handleNotifSetting(`Deleted ${res.name} from the Phonebook`, false);
                                setPersons(persons.filter((p) => p.id != id));
                        });
        }

        function flushInputs() {
                setNewPerson({ name: "", number: "" });
        }

        return (
                <div>
                        <h2>Phonebook</h2>

                        <Notification sucess={notification.type} message={notification.message} />

                        <SearchFilter query={query} setQuery={setQuery} />

                        <h3>Add a new Note</h3>
                        <Form
                                newPerson={newPerson}
                                handleChange={handleChange}
                                addPerson={addPerson}
                        />

                        <h2>Numbers</h2>

                        <DisplayPersons deletePerson={deletePerson} persons={shownPersons} />
                </div>
        );
}

export default App;
