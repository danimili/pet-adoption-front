import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import AppContext from '../AppContext';
import { useNavigate } from 'react-router-dom';
import './Pets.css';
import { FaHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {MdAssignmentReturn} from "react-icons/md"

export default function PetCard({ petData }) {
    const { deletePet, petId } = useContext(AppContext);

    const [color, setColor] = useState("#ff385d5c");

    const handleLikeClick = () => {
        setColor(color === "#ff385d5c" ? "#FF385D" : "#ff385d5c")
    }

    const handleDelete = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.delete(`http://localhost:8080/pet/${petData._id}`);
            if (res.data.ok) {
                deletePet(petData._id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleReturn = async (e, type) => {
        e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await axios.post(`http://localhost:8080/pet/${petData._id}/return`,{}, config);
    } catch (err) {
      console.log(err);
    }
  }

    const navigate = useNavigate();
    const toPetPage = () => { navigate(`/PetPage?id=${petData._id}`) };

    useEffect ( () => {
    }, [petData])

    return (
        <>
            <div className="card" >
                <img className="pet-picture" src={petData.picture} alt="Avatar" />
                <div className="container">
                    <div className='pet-data'>
                        <p><b>{petData.name}</b></p>
                        <p id='status'><b>{petData.adoptionStatus}</b></p>
                    </div>
                    <div className="in-line-btns">
                        <div className="del-icon">
                            <Tooltip title="Details">
                                <svg width="30" height="30" viewBox="0 0 384 384" fill="none" xmlns="http://www.w3.org/2000/svg" onClick= {toPetPage}  >
                                    <path d="M379.827 131.5C375.444 119.77 368.074 111.288 358.51 106.976C354.121 105.001 349.515 104 344.822 104C324.797 104 304.45 122.667 294.19 150.454C281.492 184.874 288.875 218.589 311.363 228.877C315.885 230.948 320.728 232 325.757 232C346.153 232 366.883 214.881 377.338 189.404C385.238 170.121 386.168 148.477 379.827 131.5Z" fill="black" />
                                    <path d="M89.811 150.454C79.551 122.667 59.204 104 39.179 104C34.486 104 29.879 105.001 25.49 106.976C15.925 111.288 8.55598 119.77 4.17298 131.5C-2.16802 148.477 -1.23801 170.121 6.66299 189.404C17.118 214.881 37.848 232 58.244 232C63.272 232 68.115 230.948 72.638 228.877C95.126 218.589 102.509 184.874 89.811 150.454Z" fill="black" />
                                    <path d="M134.347 146.601C136.202 146.682 138.074 146.631 139.91 146.45C150.697 145.391 160.45 139.856 168.117 130.442C180.488 115.251 183.923 91.468 181.318 67.003C177.336 29.3 157.469 1.161 130.776 0C130.776 0 126.965 0.00800079 125.026 0.193001C113.25 1.357 102.545 7.476 94.069 17.888C81.778 32.989 75.871 55.458 78.266 77.992C82.202 115.269 106.836 145.404 134.347 146.601V146.601Z" fill="black" />
                                    <path d="M192 176C128 176 64 252.074 64 325.128C64 346.926 74.932 364.459 85.667 371.645C98.925 380.516 108.269 384 127.704 384C150.797 384 157.029 375.922 167.84 368.795C175.659 363.643 182.412 359.19 192.001 359.19C201.59 359.19 208.343 363.643 216.161 368.795C226.972 375.922 233.203 384 256.297 384C275.731 384 285.075 380.516 298.333 371.645C309.068 364.459 320 346.926 320 325.128C320 252.074 256 176 192 176Z" fill="black" />
                                    <path d="M244.281 146.265C246.117 146.447 247.99 146.497 249.844 146.416C277.355 145.22 301.99 115.084 305.925 77.809C308.32 55.275 302.411 32.805 290.121 17.705C281.645 7.29301 271.338 1.47701 259.561 0.313011C257.622 0.127011 253.415 0.00100708 253.415 0.00100708C226.722 1.16201 206.854 29.116 202.873 66.818C200.269 91.284 203.703 115.066 216.073 130.257C223.741 139.671 233.494 145.206 244.281 146.265V146.265Z" fill="black" />
                                </svg>
                            </Tooltip>
                        </div>
                        <div className='icon-space'></div>
                        <Tooltip title="Save">

                            <FaHeart className="heart-icon" size={35} style={{ color: color }} onClick={handleLikeClick} />

                        </Tooltip>
                        <div style={{width: 35}}></div>
                        <Tooltip title="Return">
                            <div onClick= {handleReturn}>
                        <MdAssignmentReturn size={35}/>
                        </div>
                        </Tooltip>
                        {/* <Tooltip className="del-icon" title="Delete">
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip> */}
                    </div>
                </div>
            </div>
        </>
    )
}
