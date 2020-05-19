
import React from 'react'


// import {AuthContext} from '../context/AuthContext'
export const CreateMessage = (props) => {
    

    return(
        <div className="row">
            <input 
             placeholder="Enter your message"  
             id="textarea" 
             type="text"
             value={ props.postText}
            onChange={props.setText}
            onKeyPress={props.PostCreateHandler}
           />
        </div>
    )
}