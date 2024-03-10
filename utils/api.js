const func = (type) => async(url, data) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: type,
  headers: { 'Content-Type': 'application/json' }
})).json()

const api = {
    get: func('GET'),
    post: func('POST'),
    patch: func('PATCH'),
    put: func('PUT'),
    delete: func('DELETE'),
}

export const getEvent = async (id, userId) => await api.get(`/api/event?id=${id}${userId ? "&userId=" + userId : ''}`)
export const setAttend = async (userId, eventId) => await api.post(`/api/event/attend?userId=${userId}&eventId=${eventId}`)