import React, {useContext} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import  { AuthContext }  from '../../context/AuthContext'
import './Navbar.module.css'

export const Navbar =  (props) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const isAuth =  props.isAuth

    const logoutHandler = event => {
      event.preventDefault()
      auth.logout();
      history.push('/login')
    }
    
   
   
    if(isAuth){
    return(
      
      <div className="container">
      <nav>
        <div className="nav-wrapper  blue lighten-2">
          <NavLink to="/" className="left brand-logo">SWEATER</NavLink>
     
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
            <li><div className="col s8">
              <input type="text" id="autocomplete-input" className="autocomplete" />
              <label htmlFor="autocomplete-input" value="Autocomplete"></label>
            </div>
            </li>
            <li>
              <NavLink 
              to="/create"
              >
                Create
                </NavLink>
                </li>
            <li>
              <NavLink 
              to="/detail/1"
              >
                Detail
                </NavLink>
                </li>
              <li>
                <a href="/" 
                 onClick={logoutHandler} 
                 >
                   Logout
                   </a>
                   </li>
          </ul>
          </div>
      </nav>
      </div>

   )}
   return(
     <div>
      <div className="container">
      <nav>
        <div className="nav-wrapper blue lighten-2" >
          <NavLink to="/" className="brand-logo">SWEATER </NavLink>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
              <li><NavLink to="/login" >Login </NavLink></li>
              <li><NavLink to="/registration" >Registration </NavLink></li>
          </ul>
            </div>
        </nav>
      </div>
     </div>
   )
}
