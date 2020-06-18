import React,  {useCallback, useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader/Loader'
import {MessageList} from '../components/MessageList/MessageList'



export const MessagesPage = () => {
    const [messages, setMessages] = useState()
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchMessages = useCallback(async () => {
        try {
            const fetched = await request('/api/card', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMessages(fetched)
        } catch (e) {

        }
    },
        [token, request]
    )
    
    useEffect(() => {
        fetchMessages()
    }, [fetchMessages])

    if (loading) {
        return <Loader />
    }

    return (

        <>
            {!loading && <MessageList messages={messages} />}
        </>


    )
}