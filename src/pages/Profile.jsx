import { useContext, useEffect, useState } from 'react'
import AppContext from '../AppContext'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import './Profile.css'

export default function Profile() {
  const { currentUser, currentLastName, currentEmail, currentPhone, loggedInUser, currentBio } = useContext(AppContext);
  const [userName, setUserName] = useState(currentUser)
  const [userSurname, setUserSurname] = useState(currentLastName)
  const [userPhone, setUserPhone] = useState(currentPhone)
  const [userEmail, setUserEmail] = useState(currentEmail)
  const [userBio, setUserBio] = useState('')
  const [tooltip, setTooltip] = useState(false)

  const handleUpdateProfile = async => {
    try {
      const user = {
        userName: userName,
        userSurname: userSurname,
        userPhone: userPhone,
        userEmail: userEmail,
        userBio: userBio
      }
      
      setTooltip(true);
      setTimeout(() => {
        setTooltip(false)
      }, 2000);
      const res = axios.put(`http://localhost:8080/users/${loggedInUser._id}`, user)
      setTooltip(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Profile</h1>
      <div className="lgn-sgn-container">
        <form className="profile-form">
          <label>Name</label>
          <input onChange={(e) => setUserName(e.target.value)}
            defaultValue={userName}
            name="type"
            id="type" />
          <label>Last Name</label>
          <input onChange={(e) => setUserSurname(e.target.value)}
            value={userSurname}
            name="name"
            id="name" />
          <label>Phone</label>
          <input onChange={(e) => setUserPhone(e.target.value)}
            value={userPhone}
            name="name"
            id="name" />
          <label>Email</label>
          <input onChange={(e) => setUserEmail(e.target.value)}
            defaultValue={userEmail}
            name="height"
            id="height" />
          <label>About me</label>
          <input onChange={(e) => setUserBio(e.target.value)}
            defaultValue={currentBio}
            name="bio"
            id="bio" />
        </form>
        <button onClick={handleUpdateProfile} className="lgn-sgn-button" id='data-tooltip-id'>
          Save
        </button>
        {tooltip ? <Alert severity="success">Updated</Alert> : ""}
      </div>
    </>
  )
}