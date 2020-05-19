import React, {useContext, useEffect, useState} from 'react'
import {  useHistory } from "react-router-dom"
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'


export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()     // делает поля активными
   }, [])

    const changeHandler = event => {                                        
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const mainPageHandler = async () =>{
        try {
            history.goBack()
           
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            // alert(`${data.token}`) 
           auth.login(data.token, data.userId)
           
        } catch (e) {}
    }

  return (
        <div className="row">
        <div className="col s6 offset-s3">
            <h1>Authorization</h1>                   
             <div className="card blue">
                 <div className="card-content white-text">
                     <span className="card-title">Login</span>
                     <div>
                   
                     <div className="input-field">
                         <input 
                             placeholder="Email" 
                             id="email" 
                             type="text" 
                             name="email"
                             className="yellow-input"
                             value={ form.email}
                             onChange={changeHandler}
                             />
                         <label htmlFor="email"> </label>
                     </div>
                     

                     <div className="input-field">
                         <input 
                             placeholder="Password" 
                             id="password" 
                             type="password" 
                             name="password"
                             className="yellow-input"
                             value={ form.password}
                             onChange={changeHandler}
                             />
                         <label htmlFor="email"> </label>
                          </div>
                 
                 </div>
                 </div>
                 <div className="card-action">
                     <button 
                         className="btn grey darken-3" 
                         style={{marginRight: 10}}
                         disabled={loading}
                         onClick={loginHandler}
                         >
                             login
                         </button>
                     <button 
                     className="btn grey lighten-1 black-text"
                     onClick={mainPageHandler}
                     disabled={loading}
                     >
                         cancel
                     </button>

                 </div>
             </div>
        </div>
     </div>
    )
}