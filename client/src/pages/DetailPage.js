import React, {useCallback, useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {Loader} from '../components/Loader/Loader'
import { MessageCard } from '../components/MessageCard/MessageCard'
export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} =  useHttp()
    const [postText, setPostText] = useState(null)
    const messageId = useParams().id


    const getMessage = useCallback(
        async () => {
           try {
            const fetched =  await request(`/api/card/${messageId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
             })
             setPostText(fetched)
             console.log(postText)

           } catch (e) {
           }
        },
        [token, messageId, request]
    )

    useEffect(() => {
        getMessage()
        
    }, [getMessage])
    if(loading){
        return <Loader />
    }


    
    return(
        <>
            {console.log(postText)}
        { !loading && postText && <MessageCard message={ postText }  /> }

        </>
    )
}