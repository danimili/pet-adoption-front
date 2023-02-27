import { useState, useContext } from "react";
import axios from "axios"
import './PetsForm.css';
import AppContext from "../AppContext";

export default function PetsForm() {
  const { addPet } = useContext(AppContext);
  const [hypoallergnic, setHypoallergnic] = useState(false);
  const token = localStorage.getItem("token")
  const [petInfo, setPetInfo] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    picture: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    dietery: "",
    breed: "",
  });
  const [petImage, setPetImage] = useState('')

  const handlePetInfo = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPetImage(e.target.files[0])
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const petInfoData = new FormData()
      petInfoData.append('type', petInfo.type);
      petInfoData.append('name', petInfo.name);
      petInfoData.append('adoptionStatus', petInfo.adoptionStatus);
      petInfoData.append('height', petInfo.height);
      petInfoData.append('weight', petInfo.weight);
      petInfoData.append('color', petInfo.color);
      petInfoData.append('bio', petInfo.bio);
      petInfoData.append('hypoallergnic', petInfo.hypoallergnic);
      petInfoData.append('dietery', petInfo.dietery);
      petInfoData.append('breed', petInfo.breed);
      petInfoData.append('petImage', petImage);

      const res = await axios.post("http://localhost:8080/pet/", petInfoData, { headers: { authorization: `Bearer ${token}` } });
      addPet(res.data)
      // setUserInput({ userEmail: '', userPassword: '' })
      setPetInfo({type: "",
      name: "",
      adoptionStatus: "",
      picture: "",
      height: "",
      weight: "",
      color: "",
      bio: "",
      dietery: "",
      breed: ""})
      setPetImage(e.target)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="lgn-sgn-container">
        <form className="pet-form">
          <h1>Add Pet</h1>
          <input placeholder="Pet type"
            onChange={handlePetInfo}
            value={petInfo.type}
            name="type"
            id="type" />
          <input placeholder="Name"
            onChange={handlePetInfo}
            value={petInfo.name}
            name="name"
            id="name" />
          <select placeholder="Adoption status"
            onChange={handlePetInfo}
            value={petInfo.adoptionStatus}
            name="adoptionStatus"
            id="adoptionStatus">
              <option className="input-option">
              Adoption Status
            </option>
            <option className="input-option" value={"Available"}>
              Available
            </option>
            <option className="input-option" value={"Adopted"}>
              Adopted
            </option>
            <option className="input-option" value={"Fostered"}>
              Fostered
            </option>
          </select>
          <input placeholder="Height"
            type="number"
            onChange={handlePetInfo}
            value={petInfo.height}
            name="height"
            id="height" />
          <input placeholder="Weight"
            type="number"
            onChange={handlePetInfo}
            value={petInfo.weight}
            name="weight"
            id="weight" />
          <input placeholder="Color"
            onChange={handlePetInfo}
            value={petInfo.color}
            name="color"
            id="color" />
          <input placeholder="Short bio"
            onChange={handlePetInfo}
            value={petInfo.bio}
            name="bio"
            id="bio" />
          <input placeholder="Dietery restrictions"
            onChange={handlePetInfo}
            value={petInfo.dietery}
            name="dietery"
            id="dietery" />
          <input placeholder="Breed"
            onChange={handlePetInfo}
            value={petInfo.breed}
            name="breed"
            id="breed" />
        </form>
      <input
        onChange={handleImage}
        name="picture"
        type="file"
        accept='img/*'
        id="picture"
      />
        <button className="lgn-sgn-button" onClick={handleClick}>
          Add pet
        </button>
      </div>
    </>
  );
}