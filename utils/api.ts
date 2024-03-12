const func = (type: string) => async(url: string, data?: any) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: type,
  headers: { 'Content-Type': 'application/json' }
}))?.json()

const api = {
    get: func('GET'),
    post: func('POST'),
    patch: func('PATCH'),
    put: func('PUT'),
    delete: func('DELETE'),
}

export const getEvent = async (id: number, userId: number) => await api.get(`/api/event?id=${id}${userId ? "&userId=" + userId : ''}`)
export const setAttend = async (userId: number, eventId: number) => await api.post(`/api/event/attend?userId=${userId}&eventId=${eventId}`)

export const getComments = async (eventId: number, limit: [number, number]) => await api.get(`/api/event/comments?eventId=${eventId}&min=${limit[0]}&max=${limit[1]}`)