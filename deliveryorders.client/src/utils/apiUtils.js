export async function populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    return(data);
}
export async function getAllDeliveryOrders() {
    const options = {
        method: 'GET',
        headers: new Headers()   
    }
    const response = await fetch('api/Orders/GetAll', options);
    if(!response.ok)
        throw response.statusText;
    const data = await response.json();
    return(data);
}

export const createDeliveryOrder = async (newOrder) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newOrder)
    };


    const response = await fetch('api/Orders/Create', options);
    if(!response.ok)
        throw response.statusText;
    const data = await response.json();
    return(data);
}

export const updateDeliveryOrder = async (oldOrder) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const options = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(oldOrder)
    };

    const response = await fetch('api/Orders/Update', options);
    if(!response.ok)
        throw response.statusText;
    const data = await response.json();
    return(data);
}

export const deleteDeliveryPost = async (id) => {
    const options = {
        method: 'DELETE',
        headers: new Headers()   
    }
    const response = await fetch(`api/Orders/Delete/${id}`, options);
    if(!response.ok)
        throw response.statusText;
}