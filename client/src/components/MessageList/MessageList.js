import React,  {useCallback, useContext, useState} from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'

export const  MessageList = ({ messages='' }) => {

  const [post, setPost] = useState()
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const removeTodo = useCallback(async () => {
    try {
        const fetched = await request('/api/card/delete', 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
        setPost(fetched)
    } catch (e) {

    }
},
    [token, request]
)
    if (!messages.length ) {
        return <p className="center"></p>
      }
      
      
    return (
        <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Сообщение</th>
          <th>Дата</th>

        </tr>
        </thead>
  
        <tbody>
        { messages.map((message, index) => {
          return (
            <tr key={message._id}>
              <td>{index + 1}</td>
              <td>{ message.message}</td>
              <td>{message.date}</td>
              <button className='rm' onClick={removeTodo}>
               &times;
               </button>
              
            </tr>
            
          )
        }) }
        </tbody>
      </table>
    )
        
    
}