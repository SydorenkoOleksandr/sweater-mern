import React from 'react'
import profileCss from './Profile.module.css'
import { MyPosts } from './MyPosts/MyPosts'
import MessageList from '../MessageList/MessageList'

export const Profile = () => {
    return(
       <div className={profileCss.nav}>
           <div >
             <MessageList />
              
           </div>
       </div>
    )

}