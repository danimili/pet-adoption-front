import axios from 'axios';
import { React, useContext, useEffect, useState } from 'react'
import './PetPage.css'
import { BiHomeHeart } from "react-icons/bi"
import { SiDatadog } from "react-icons/si"
import Tooltip from '@mui/material/Tooltip';
import AppContext from '../AppContext';

export default function PetPage() {
  const { appId, isAdmin } = useContext(AppContext)
  const url = new URLSearchParams(window.location.search)
  const petId = url.get('id')
  const [petInfo, setPetInfo] = useState();
  const [breed, setBreed] = useState(petInfo)
  const [isAdopted, setIsAdopted] = useState()
  const [isFostered, setIsFostered] = useState()

  useEffect(() => {
    getPetDetails()
  }, [])

  const getPetDetails = async () => {
    try {
      const response = await axios.get(`https://pet-adoption-back.vercel.app/pet/${petId}`);
      setPetInfo(response.data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdopt = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { authorization: `Bearer ${token}` } };
      console.log(appId, "appId")
      const res = await axios.post(`http://localhost:8080/pet/${petId}/adopt`,{}, config);
      setIsAdopted(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFoster = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await axios.post(`http://localhost:8080/pet/${petId}/foster`,{}, config);
      setIsFostered(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {
        petInfo ?
          <div className="pet-card">
            <div className="pet-card-top">
              <img className="pet-card-img" src={petInfo.picture} alt="Avatar" />
              <div className="pet-card-top-txt">                
              <div className="pet-card-txt" id="name-card"><b>Name: {petInfo.name}</b></div>
                <div className="pet-card-txt" id="type-card"><b>Type: {petInfo.type}</b></div>
                <div className="pet-card-txt" id="status-card"><b>Status: {petInfo.adoptionStatus}</b></div>
              </div>
            </div>
            <div className="pet-page-icons">
              {petInfo.adoptionStatus === 'Adopted' ? '' :
                <>
                  <Tooltip title="Adopt">
                    <div onClick={handleAdopt}>
                      <BiHomeHeart size={35} />
                    </div>
                  </Tooltip>
                  {petInfo.adoptionStatus === 'Fostered' ? '' : <Tooltip title="Foster">
                    <div onClick={handleFoster}>
                      <SiDatadog size={35} />
                    </div>
                  </Tooltip>}
                </>
              }
            </div>
            <div className="pet-card-txt">Height: {petInfo.height}</div>
            <div className="pet-card-txt">Weight: {petInfo.weight}</div>
            <div className="pet-card-txt">Color: {petInfo.color}</div>
            <div className="pet-card-txt">Bio: {petInfo.bio}</div>
            <div className="pet-card-txt">Dietery: {petInfo.dietery}</div>
            <div className="pet-card-txt">Breed: {petInfo.breed}</div>
          </div>
          :
          ""
      }
    </>
  )
}
