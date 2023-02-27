import SearchComponent from './SearchComponent';
import PetList from './PetList';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Pets() {

  const [allPets, setAllPets] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState()

  const getAllPets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pet/');
      setAllPets(response.data)
      if(!response) {
        setNoResultsMessage(true)
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPets()
  }, [])


  return (
    <>
      <h1>Meet Our Friends</h1>
      <SearchComponent setAllPets={setAllPets}/>
      <div className="wrap">
      <PetList list={allPets} setAllPets={setAllPets} />
      {noResultsMessage && <h1>No results</h1>}
      </div>
    </>
  )
}
