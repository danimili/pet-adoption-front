import {useState} from 'react'
import './UserComponent.css';

export default function UserComponent({ userData , list}) {

  return (
    <>
<table className='table'>
      <thead className='thead'>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
          {list?.map((userData) => {
return (
        <tr className='tr'>
<>
          <td>{userData.userName}</td>
          <td>{userData.userSurname}</td>
          <td>{userData.userEmail}</td>
          <td>{userData.userPhone}</td>
          <td>{userData.role}</td>
          </>
        </tr>
)
        })}
      </tbody>
    </table>
    </>
  )
}
