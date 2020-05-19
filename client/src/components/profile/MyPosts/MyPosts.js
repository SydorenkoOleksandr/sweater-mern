import React from 'react'
import styles from './MyPosts.module.css' 
import Post from './Post/Post'
import { CreatePage } from '../../../pages/CreatePage'
export const MyPosts = () => {
    
    return(
       <div className="myPosts">
           My Posts
           <div>
                <CreatePage />
           </div>

           <div className={styles.posts}>
              <Post message="hello" like='3'/>
              <Post message="You are Welcome" like='315' />
           </div>
       </div>
    )

}