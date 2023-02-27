import React from 'react';
import UsersList from './UsersList';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Users.css';
import { useContext } from 'react';
import AppContext from '../AppContext';

export default function Users() {

  const [allUsers, setAllUsers] = useState([]);
  const {token} = useContext(AppContext)
  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users', {headers : {authorization: `Bearerrrrrrr ${token}`}});
      setAllUsers(response.data)
      // return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
<>
 <h1>Users</h1>
 <div className="dashboard-container">
  <UsersList list={allUsers}/>
 </div>
</>
  );
}