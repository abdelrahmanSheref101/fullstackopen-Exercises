# Phonebook App

A simple React app for managing a phonebook. Users can add, update, delete, and filter contacts. Built as part of the [Fullstack Open](https://fullstackopen.com/en/) course.

---

## Features

- **Add new contacts** with name + phone number
- **Prevent duplicates**: if a name already exists, user is asked to confirm updating the number
- **Update contact numbers** via confirmation
- **Delete contacts** with confirmation
- **Filter/search** contacts by name (case-insensitive)
- **Notifications** for success and error states (auto-disappear after 3 seconds)
- **Data persistence** via backend (JSON server / custom Express API)

---

## Tech Stack

- [React](https://react.dev/) (useState, useEffect, props, components)
- [Axios](https://axios-http.com/) for HTTP requests
- [JSON Server](https://github.com/typicode/json-server) _(for local backend during development)_
- CSS for styling & notifications

---

## Project Structure

```
src/
 ├── components/
 │    ├── Filter.js        # Search/filter input
 │    ├── PersonForm.js    # Form for adding/updating contacts
 │    ├── Persons.js       # List of contacts
 │    ├── Notification.js  # Success/error messages
 │
 ├── services/
 │    └── persons.js       # Axios calls for CRUD
 │
 ├── App.js                # Main app, manages state
 └── index.js              # Entry point
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start backend (JSON Server on port 3001)

```bash
npx json-server --port 3001 --watch db.json
```

### 3. Start frontend (React dev server on port 5173 or 3000)

```bash
npm run dev
```

---

## API (JSON Server / Express)

- `GET    /api/persons` → list all persons
- `POST   /api/persons` → add new person
- `PUT    /api/persons/:id` → update existing person
- `DELETE /api/persons/:id` → delete person

---

## Example

- Add person: `"Arto Hellas, 040-123456"`
- If "Arto Hellas" already exists → confirm replacement → updates number.
- Notification shows: _“Updated Arto Hellas”_ or _“Added Ada Lovelace”_.

---

## 🧑‍💻 Development Notes

- State is managed in **App.js** and passed down to child components as props.
- Helper functions (`notify`, `findExistingPerson`, etc.) are used to keep `App.js` readable.
- Errors from backend (e.g. validation) are displayed to user.
- Code follows **single responsibility principle**: each component handles one job.
