import React from 'react'
import PetCard from './PetCard'

export default function PetList({ list }) {
    const newList = list;
    return (
        <>
            <ul className='listOfPets'>
                {
                    newList.map((pet) => (
                        <li key={pet._id}><PetCard petData={pet} /></li>
                    ))
                }
            </ul>
        </>
    )
}
