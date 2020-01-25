import { API_URL } from '../constants'

export const millService = {
    addMill,
    getMills,
    deleteMill
};


function addMill(millName) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ name: millName })
    };
    return fetch(`${API_URL}/mills`, requestOptions)
        .then(response => {
            return response.data;
        });
}

function getMills() {
    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/mills`, requestOptions)
        .then(response => response.json())
        .then(mills => {
            return mills.data
        })
}

function deleteMill(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/mills/` + id, requestOptions)
}