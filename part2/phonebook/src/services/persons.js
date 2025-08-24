import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
        let request = axios.get(baseUrl);
        return request.then((res) => res.data);
};

const update = (id, newPerson) => {
        let request = axios.put(`${baseUrl}/${id}`, newPerson);
        return request.then((res) => res.data);
};

const create = (newPerson) => {
        let request = axios.post(baseUrl, newPerson);
        return request.then((res) => res.data);
};

const delEntry = (id) => {
        let request = axios.delete(`${baseUrl}/${id}`);
        return request.then((res) => res.data);
};

export default { getAll, update, create, delEntry };
