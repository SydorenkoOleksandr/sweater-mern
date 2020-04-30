import React, {useContext} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
// import { useRoutes } from '../routes'
import { AuthContext } from '../context/AuthContext'
import { useAuth } from '../hooks/auth.hook'

export const Navbar =  () => {
  const history = useHistory()
  const auth = useContext(AuthContext)


    const logoutHandler = event => {
      event.preventDefault()
      auth.logout();
      history.push('/login')
    }

   
  
    return(
      
      <nav>
        <div className="nav-wrapper blue lighten-3">
          <NavLink to="/" className=" left brand-logo">SWEATER </NavLink>
     
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
            <li><div className="col s8">
              <input type="text" id="autocomplete-input" className="autocomplete" />
              <label htmlFor="autocomplete-input" value="Autocomplete"></label>
            </div>
            </li>
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/detail/1">Detail</NavLink></li>
            
              <li><a href="/"  onClick={logoutHandler} >Logout</a></li>
          </ul>
          
        

          </div>
       
      </nav>
   )
}
