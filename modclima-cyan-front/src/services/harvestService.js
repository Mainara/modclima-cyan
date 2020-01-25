import { API_URL } from '../constants'

export const harvestService = {
    addHarvest,
    getHarvests,
    deleteHarvest
};

function addHarvest(harvest) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(harvest)
    };
    console.log(requestOptions.body)
    return fetch(`${API_URL}/harvests`, requestOptions)
        .then(response => {
            return response.data;
        });
}

function getHarvests() {
    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/harvests`, requestOptions)
        .then(response => response.json())
        .then(harvests => {
            return harvests.data
        })
}

function deleteHarvest(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/harvests/` + id, requestOptions)
}