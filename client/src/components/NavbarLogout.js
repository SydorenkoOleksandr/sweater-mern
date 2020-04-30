import React  from 'react'
import { NavLink } from 'react-router-dom'


export const NavbarLogout =  () => {

return(
    <nav>
      <div className="nav-wrapper blue lighten-2" >
        <NavLink to="/" className="brand-logo">SWEATER </NavLink>
        <ul id="nav-mobile" className="right hide-on-sm-and-down">
            <li><NavLink to="/login" >login </NavLink></li>
            <li><NavLink to="/registration" >registration </NavLink></li>
        </ul>
      </div>
  </nav>
)
}