type URLProps = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

const func = (type: URLProps) => async(url: string, data?: any) => await (await fetch(url, {
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
export const setAttend = async (userId: number, eventId: number) => await api.post(`/api/event/attend/${eventId}`, { userId })
export const searchAttendees = async (eventId: number, q: string) => await api.get(`/api/event/attend/${eventId}?q=${q}`)

export const getComments = async (eventId: number, limit: [number, number]) => await api.get(`/api/event/comments?eventId=${eventId}&min=${limit[0]}&max=${limit[1]}`)
export const insertComment = async (data: { authorId: number, eventId: number, text: string, reply?: number }) => await api.post('/api/event/comments', data)
export const deleteComment = async (commentId: number) => await api.delete('/api/event/comments', { commentId })