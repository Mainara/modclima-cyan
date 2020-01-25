import { API_URL } from '../constants'

export const farmService = {
    addFarm,
    getFarms,
    deleteFarm
};

function addFarm(farm) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(farm)
    };
    return fetch(`${API_URL}/farms`, requestOptions)
        .then(response => {
            return response.data;
        });
}

function getFarms() {
    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/farms`, requestOptions)
        .then(response => response.json())
        .then(farms => {
            return farms.data
        })
}

function deleteFarm(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(`${API_URL}/farms/` + id, requestOptions)
}