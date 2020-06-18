import React, {useState, useContext, useEffect} from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import { CreateMessage } from '../components/profile/MyPosts/CreateMessage/CreateMessage'

export const CreatePage = () => {
    const history = useHistory()
     const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [postText, setPostText] = useState('' )

 
    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const PostCreateHandler = async event =>{
        if(event.key === 'Enter') {  
        try {
            const data = await request('/api/card/generate', 'POST', {message: postText}, {
               Authorization: `Bearer ${auth.token}`
            })
            await history.push(`/detail/${data.card._id}`)
           
        } catch (e) {
           
        }
    }
    }
    const setText = e => setPostText(e.target.value)

    return(
        <div className="row">
            <CreateMessage 
                postText={ postText }
                setText={ setText }
                PostCreateHandler={ PostCreateHandler }
           />
                       
        </div>
    )
}