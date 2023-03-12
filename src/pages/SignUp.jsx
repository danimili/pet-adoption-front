import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import axios from 'axios'
import AppContext from '../AppContext';
import Alert from '@mui/material/Alert';

export default function SignUp() {
  const [userInput, setUserInput] = useState({ userName: '', userSurname: '', userEmail: '', userPhone: '', userPassword: '', userRepassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { setLoggedIn } = useContext(AppContext)

  const navigate = useNavigate()

  const navigateLogin = async () => {
    navigate("/Login");
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        userName: userInput.userName,
        userSurname: userInput.userSurname,
        userPhone: userInput.userPhone,
        userEmail: userInput.userEmail,
        userPassword: userInput.userPassword,
        userRepassword: userInput.userRepassword,
        userBio: userInput.userBio
      }
      const res = await axios.post('https://pet-adoption-back.vercel.app/users/signup', newUser);
      localStorage.setItem("loggedinuser", res.data.userName)
      setLoggedIn(true)
      navigateLogin()
    } catch (err) {
      console.log(err);
    }
    if(userInput.userPassword === userInput.userRepassword){
    setUserInput({ userName: '', userSurname: '', userEmail: '', userPhone: '', userPassword: '', userRepassword: '' })
    } else {
      setErrorMessage(true)
    }
  };

  function handleChange(e) {
    e.preventDefault()
    setUserInput({ ...userInput, [e.target.className]: e.target.value })
  }

  return (
    <>
      <div className="lgn-sgn-container">
        <h1>Sign Up</h1>
        <form className="lgn-sgn-forms">
          <input onChange={handleChange} value={userInput.userName} className="userName" placeholder="First Name" type="text" />
          <input onChange={handleChange} value={userInput.userSurname} className="userSurname" placeholder="Last Name" type="text" />
          <input onChange={handleChange} value={userInput.userPhone} className="userPhone" placeholder="Phone Number" type="text" />
          <input onChange={handleChange} value={userInput.userEmail} className="userEmail" placeholder="Email" type="text" />
          <input onChange={handleChange} value={userInput.userPassword} className="userPassword" placeholder="Password" type="password" />
          <input onChange={handleChange} value={userInput.userRepassword} className="userRepassword" placeholder='Re password' type="password" />
          {errorMessage && <Alert severity="error">Passwords do not match!</Alert>}
          <button onClick={handleSignUp} className="lgn-sgn-button">Sign Up</button>
        </form>
      </div>
    </>
  )
}



