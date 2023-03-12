import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PetCard from './PetCard';
import nopets from './avatarPhotos/nopet.jpeg'

export default function MyPets({appId}) {
  const [showPets, setShowPets] = useState([])

  const getPetDetails = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { authorization: `Bearer ${token}` } };
      const response = await axios.get(`https://pet-adoption-back.vercel.app/pet/mypet/${appId}`, {}, config);
      const arr = await response.data.map(async petId => {
        const res = await axios.get(`https://pet-adoption-back.vercel.app/pet/${petId}`, {}, config);
        return res.data
      })
      const allPets = await Promise.all(arr)
      setShowPets(allPets)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getPetDetails()
  }, [appId])

  return (
    <>
      <h1>My Pets</h1>
      <div className="pets-list">
        {showPets?.length > 0 ? showPets.map(pet => {
          return <div className="my-pets"><PetCard key={pet._id} petData={pet} /></div>
        }) : <img className="no-pets" src={nopets} alt="No Pets" style={{ width: 800, height: 400 }}/>}
      </div>
    </>

  )
}
