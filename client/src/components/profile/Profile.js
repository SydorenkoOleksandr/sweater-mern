import React from 'react'
import profileCss from './Profile.module.css'
import { MyPosts } from './MyPosts/MyPosts'

export const Profile = () => {
    return(
       <div className={profileCss.nav}>
           <div >
              <MyPosts />
              
           </div>
       </div>
    )

}