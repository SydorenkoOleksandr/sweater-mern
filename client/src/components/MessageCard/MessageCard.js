import React from 'react'

export const MessageCard = ({ message }) => {
    return(
        <> 
            <h2>Message</h2>

    <p> Сообщение : { message.message} </p>
    <p> {message.date}</p>
    <p> {message.userName}</p>
    


        </>
    )
}