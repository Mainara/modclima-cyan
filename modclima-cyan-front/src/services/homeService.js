import { API_URL } from '../constants'

export const homeService = {
    filterFields
};

function filterFields(millName, startDate, endDate, harvestCode, farmName, farmCode, fieldCode) {
    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    let url = new URL(`${API_URL}/filter`),
        params = {
            millName: millName,
            startDate: `${startDate}`,
            endDate: `${endDate}`,
            harvestCode: harvestCode,
            farmName: farmName,
            farmCode: farmCode,
            fieldCode: fieldCode
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(fields => {
            return fields.data
        })
}