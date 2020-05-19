import React from 'react'

 const Post = (props) => {
    return(
       <div className="post">
           <div>
               <img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg" alt=" "/>
               { props.message }
               <span> { props.like }</span>
           </div>
       </div>
    )

}
export default Post