import React from 'react'
import UserComponent from './UserComponent'
import './UsersList.css';


export default function UsersList({ list }) {
  return (
    <>
           <UserComponent list={list} />
    </>
  )
}
