import React, {useState,useContext, useEffect} from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const RegistrationPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect( () =>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
   }, [])

    const changeHandler = event => {                                        
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)

        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            console.log('Data', data.token)
            alert('asd')

        } catch (e) {}
    }

    return(
        <div className="row">
        <div className="col s6 offset-s3">
            <h1>Lets register in SWEATER</h1>                   
             <div className="card blue ">
                 <div className="card-content white-text">
                     <span className="card-title">Registration</span>
                     <div>
                   
                     <div className="input-field">
                         <input 
                             placeholder="Email" 
                             id="email" 
                             type="text" 
                             name="email"
                             className="yellow-input"
                            //  value={ form.email}
                             onChange={changeHandler}
                             />
                         <label htmlFor="email"> </label>
                     </div>

                     <div className="input-field">
                         <input 
                             placeholder="User Name" 
                             id="userName" 
                             type="text" 
                             name="userName"
                             className="yellow-input"
                            //  value={ form.email}
                             onChange={changeHandler}
                             />
                         <label htmlFor="text"> </label>
                     </div>
                     

                     <div className="input-field">
                         <input 
                             placeholder="Password" 
                             id="password" 
                             type="password" 
                             name="password"
                             className="yellow-input"
                            //  value={ form.password}
                             onChange={changeHandler}
                             />
                         <label htmlFor="email"> </label>
                          </div>
                 
                 </div>
                 </div>
                 <div className="card-action">
                     <button 
                         className="btn yellow darken-4" 
                         style={{marginRight: 10}}
                         disabled={loading}
                         onClick={loginHandler}
                         >
                             login
                         </button>
                     <button 
                     className="btn grey lighten-1 black-text"
                     onClick={registerHandler}
                     disabled={loading}
                     >
                         Registration
                     </button>

                 </div>
             </div>
        </div>
     </div>
    )
}