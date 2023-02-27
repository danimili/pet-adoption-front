import './MainNavigation.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../AppContext';
import { useNavigate } from "react-router-dom";

export default function MainNavigation({ token, isAdmin }) {
  const { setLoggedIn } = useContext(AppContext)

  const navigate = useNavigate()
  const navigateHome = () => {
    navigate("/");
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedinuser");
    window.localStorage.removeItem("token");
    setLoggedIn(false)
    navigateHome()
  }

  return (
    <div className="topnav">
      <NavLink to="/">Home</NavLink>
      {!token ?
        <>
          <NavLink to="/Login">Login</NavLink>
          <NavLink to="/Signup">Sign Up</NavLink>
        </>
        :
        <>
          <NavLink to="/Pets">Pets</NavLink>
          <NavLink to="/MyPets">My Pets</NavLink>
          <NavLink to="/Profile">My Profile</NavLink>
          {isAdmin ? <NavLink to="/PetsForm">Add Pet</NavLink> : ""}
          {isAdmin ? <NavLink to="/Users">Users</NavLink> : ""}
          <a id='logOut' onClick={handleLogOut}>Log Out</a>
        </>
      }
    </div>
  )
}