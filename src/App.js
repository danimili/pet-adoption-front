import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';
import AppContext from "./AppContext"
import MainNavigation from "./navigation/MainNavigation";
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import MyPets from './pages/MyPets';
import Pets from './pages/Pets';
import PetsForm from './pages/PetsForm';
import Users from './pages/Users';
import axios from 'axios';
import PetPage from './pages/PetPage';
import Profile from './pages/Profile';
import PetList from './pages/PetList';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const [petsList, setPetsList] = useState();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentUser, setCurrentUser] = useState('')
  const [currentLastName, setCurrentLastName] = useState('')
  const [currentPhone, setCurrentPhone] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentBio, setCurrentBio] = useState('')
  const [usersList, setUsersList] = useState();
  const [loggedIn, setLoggedIn] = useState(false)
  const [updatedUser, setUpdatedUser] = useState('')
  const [loggedInUser, setLoggedInUser] = useState('')
  const [appId, setAppId] = useState('')
  const [userData, setUserData] = useState('')
  const [isAdmin, setIsAdmin] = useState('')

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedInUser(true)
    }
    const admin = JSON.parse(localStorage.getItem("isadmin"));
    setIsAdmin(admin)
    fetchPets();
    const id = localStorage.getItem("userId");
    if (id) {
      setAppId(id)
    }
  }, [])

  const fetchPets = async () => {
    try {
      const res = await axios.get(`https://pet-adoption-back.vercel.app/pet`);
      const helloUserName = localStorage.getItem("loggedIn")
      setLoggedInUser(helloUserName)
      setPetsList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPet = (newPet) => {
    const newPetsArray = [...petsList, newPet];
    setPetsList(newPetsArray);
  };

  const deletePet = (petId) => {
    const newArray = petsList.filter((pet) => pet._id !== petId);
    setPetsList(newArray);
  };

  const editPet = (newPet) => {
    const newPetsList = petsList.map((pet) => {
      if (pet._id === newPet._id) {
        return newPet;
      } else {
        return pet;
      }
    });
    setPetsList(newPetsList);
  };

  const editUser = () => {
    const newUser = updatedUser
    setUpdatedUser(newUser);
  };

  return (
    <>
      <AppContext.Provider value={{ loggedIn, setLoggedIn, petsList, addPet, deletePet, setToken, setCurrentUser, usersList, currentUser, currentLastName, setCurrentLastName, currentPhone, setCurrentPhone, currentEmail, setCurrentEmail, editUser, editPet, loggedInUser, setLoggedInUser, appId, setAppId, setUserData, userData, isAdmin, setIsAdmin, currentBio, setCurrentBio }} >
        <MainNavigation token={token} isAdmin={isAdmin} />
        <Routes>
          <Route index element={<Home token={token} loggedIn={loggedIn} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Pets" element={<Pets />} />
          <Route path="PetList" element={<PetList />} />
          <Route path="PetsForm" element={<PrivateRoute isAdmin={isAdmin}><PetsForm token={token} /></PrivateRoute>} />
          <Route path="MyPets" element={<MyPets appId={appId} />} />
          <Route path="Users" element={<Users />} />
          <Route path="PetPage" element={<PetPage appId={appId} />} />
          <Route path="Profile" element={<Profile currentUser={currentUser} appId={appId} />} /> 
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
