import {useState, useCallback} from 'react'

export const useHttp = () => {              // асинхронные запросы на сервер используя нативный API
    const [loading, setLoading] = useState(false)           //loading  state
    const [error, setError] = useState(null)                // errors state

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {     //оболочка для запроса  внутри useCallback чтоб функция не уходила в рекурсию
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)          //данные для перевода body в строку чтоб обработчик мог их принять, а не null
                headers['Content-Type'] = 'application/json' // явно указать что передаем по сети json
            }

            const response = await fetch(url, {method, body, headers})          // ответ с сервера
            const data = await response.json()                                  // парсинг ответа в json

            if (!response.ok) {
                throw new Error(data.message || 'something wrong')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}