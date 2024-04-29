type URLProps = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

const func = (type: URLProps) => async(url: string, data?: any) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: type,
  headers: { 'Content-Type': 'application/json' }
}))?.json()

export const api = {
    get: func('GET'),
    post: func('POST'),
    patch: func('PATCH'),
    put: func('PUT'),
    delete: func('DELETE'),
}

export const getEvent = async (id: number, userId: number) => await api.get(`/api/event?id=${id}${userId ? "&userId=" + userId : ''}`)
export const setAttend = async (userId: number, eventId: number) => await api.post(`/api/event/attend/${eventId}`, { userId })
export const searchAttendees = async (eventId: number, q: string) => await api.get(`/api/event/attend/${eventId}?q=${q}`)
export const getEventsForHome = async (q?: string, tag?: string, start = 0) => await api.get(`/api/events?start=${start}&${q ? 'q' : (tag ? 'tag' : '')}=${q || tag || ''}`)

export const getComments = async (eventId: number, limit: [number, number]) => await api.get(`/api/event/comments?eventId=${eventId}&min=${limit[0]}&max=${limit[1]}`)
export const insertComment = async (data: { authorId: number, eventId: number, text: string, reply?: number }) => await api.post('/api/event/comments', data)
export const deleteComment = async (commentId: number) => await api.delete('/api/event/comments', { commentId })

export const getEventsData = async (type: 'My_Tickets' | 'Organized_Events' | '', id: number | string, email: string) => await api.get(`/api/profile/${id}?type=${type}&userEmail=${email}`)
export const deleteEvent = async (id: number, creator: number) => await api.delete(`/api/event/delete/${id}`, {creator})

export const follow = async (follower: number, followed: number) => await api.post(`/api/profile/follow`, { follower, followed })
export const getFollow = async (type: 'followers' | 'following', id: number) => await api.get(`/api/profile/follow/${id}?type=${type}`)

export const getNotifications = async (id: number) => await api.get(`/api/profile/${id}/notifications`)
export const getNumOfNotifications = async (id: number) => await api.get(`/api/profile/${id}/notifications/num`)
export const readNotifications = async (id: number) => await api.post(`/api/profile/${id}/notifications`)
export const openANotification = async (id: number, notificationId: number) => await api.patch(`/api/profile/${id}/notifications`, { notificationId })

export const updateUsername = async (id: number, newUsername: string) => await api.patch(`/api/profile/${id}/edit`, { newUsername })
export const updateIcon = async (id: number, newIcon: string) => await api.patch(`/api/profile/${id}/edit`, { newIcon })