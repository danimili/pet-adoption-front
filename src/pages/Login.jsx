import { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './Login.css'
import axios from "axios"
import AppContext from '../AppContext';
import Alert from '@mui/material/Alert';

export default function Login() {
  const [userInput, setUserInput] = useState({ userEmail: '', userPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { setToken, setCurrentUser, setLoggedIn, setCurrentLastName, setCurrentEmail, setCurrentPhone, setLoggedInUser, setAppId, setUserData, setIsAdmin, setCurrentBio } = useContext(AppContext);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const existingUser = {
        userEmail: userInput.userEmail,
        userPassword: userInput.userPassword
      }
      const res = await axios.post('http://localhost:8080/users/login', existingUser)
      setCurrentUser(res.data.user.userName)
      setCurrentLastName(res.data.user.userSurname)
      setCurrentEmail(res.data.user.userEmail)
      setCurrentPhone(res.data.user.userPhone)
      setCurrentBio(res.data.user.userBio)
      setLoggedIn(true)
      setAppId(res.data.user._id)
      localStorage.setItem("loggedinuser", res.data.user.userName);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);
      if (res.data.token) {
        setUserData(res.data.user)
        setToken(res.data.token)
        setLoggedInUser(res.data.user)
        setLoggedIn(true)
        setIsAdmin(res?.data?.user?.role === 'admin')
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isadmin", res?.data?.user?.role === 'admin')
        navigate("/")
      }
    } catch (err) {
      console.log(err)
      setErrorMessage(err.response.data)
    }
    setUserInput({ userEmail: '', userPassword: '' })
  }

  const handleChange = (e) => {
    e.preventDefault()
    setUserInput({ ...userInput, [e.target.className]: e.target.value })
  }

  return (
    <>
      <div className="lgn-sgn-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="lgn-sgn-forms">
          <input onChange={handleChange} className="userEmail" placeholder="Email" type="text" />
          <input onChange={handleChange} className="userPassword" placeholder='Password' type="password" />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <button type='submit' className="lgn-sgn-button" >Sign In</button>
          <Link className="link" to="/signup">
            Not a member? Sign up
          </Link>
        </form>
      </div>
    </>
  )
}
