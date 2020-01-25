import { API_URL } from '../constants'

export const fieldService = {
    addField,
    getFields,
    deleteField
};

function addField(field) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(field)
    };
    return fetch(`${API_URL}/fields`, requestOptions)
        .then(response => {
            return response.data;
        });
}

function getFields() {
    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/fields`, requestOptions)
        .then(response => response.json())
        .then(fields => {
            return fields.data
        })
}

function deleteField(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/fields/` + id, requestOptions)
}