import { useState } from 'react';
import './SearchComponent.css';
import axios from 'axios';

export default function SearchComponent({ setAllPets }) {
  const initialValues = {
    weight: "",
    height: "",
    name: "",
    type: "",
    adoptionStatus: ""
  };

  const [values, setValues] = useState(initialValues);

  const handelSubmit = async (e) => {
    e.preventDefault();
   try {
     const res = await axios.get("http://localhost:8080/pet/search", { params: values });
     setAllPets(res.data)
   }
   catch (err) {
    console.log(err);
   }
  }

  const [isAdvancedSearchEnabled, setIsAdvancedSearchEnabled] = useState(false);

  return (
    <>
      <div className='sch-container'>
        <div className="sch-top">
          <input value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} type="text" className="search" placeholder="Search by name.." />
          <div className="main-search-bar-container">
            <br/>
            <div className="align-search-container">
              <div>
                <button className="search-pets-btn" onClick={handelSubmit}>Search</button>
              </div>
            </div>
          </div>
          <div className="filters align-type-of-pet-advanced">
            <div className='btn-and-input'>
              {!isAdvancedSearchEnabled && (
                <button
                  className="adv-search-btn"
                  onClick={() =>
                    setIsAdvancedSearchEnabled(!isAdvancedSearchEnabled)
                  }
                >
                  Advanced search
                </button>
              )}
              {isAdvancedSearchEnabled && (
                <button
                  className="adv-search-btn"
                  onClick={() =>
                    setIsAdvancedSearchEnabled(!isAdvancedSearchEnabled)
                  }
                >
                  Basic search
                </button>
              )}
            </div>
          </div>

          {!isAdvancedSearchEnabled && (
            <div className="fi
  lter-space filter-space-rest">
              <select value={values.type} onChange={(e) => setValues({ ...values, type: e.target.value })} id="pets" name="pets" className="pets-input">
                <option className="input-option" value={""}>
                  All
                </option>
                <option className="input-option" value={"Cat"}>
                  Cat
                </option>
                <option className="input-option" value={"Dog"}>
                  Dog
                </option>
              </select>
            </div>
          )}
        </div>

        {isAdvancedSearchEnabled && (
          <div className="align-advanced-filters">
            <div className="filter-space">
              <label for="pets" className="choose-a-pet">
                Type
              </label>
              <select value={values.type} onChange={(e) => setValues({ ...values, type: e.target.value })} id="pets" name="pets" className="pets-type-input">
                <option className="input-option" value={""}>
                  All
                </option>
                <option className="input-option" value={"Cat"}>
                  Cat
                </option>
                <option className="input-option" value={"Dog"}>
                  Dog
                </option>
              </select>
            </div>
            <div className="filter-space filter-space-rest">
              <label for="pets" className="choose-a-pet">
                Status
              </label>
              <select value={values.adoptionStatus} onChange={(e) => setValues({ ...values, adoptionStatus: e.target.value })} id="pets" name="pets" className="pets-type-input">
                <option className="input-option" value={"Available"}>
                  All
                </option>
                <option className="input-option" value={"Adopted"}>
                  Adopted
                </option>
                <option className="input-option" value={"Fostered"}>
                  Fostered
                </option>
                <option className="input-option" value={"Available"}>
                  Available
                </option>
              </select>
            </div>
            <div className="filter-space filter-space-rest">
              <label for="pets" className="choose-a-pet">
                Weight
              </label>
              <select onChange={(e) => setValues({ ...values, weight: e.target.value })} id="pets" name="pets" className="pets-type-input">
                <option className="input-option">
                  All
                </option>
                <option className="input-option" value={"s"}>
                  1 kg - 5 kg
                </option>
                <option className="input-option" value={"m"}>
                  6 kg - 10 kg
                </option>
                <option className="input-option" value={"l"}>
                  11 kg - 20 kg
                </option>
                <option className="input-option" value={"xl"}>
                  More than 21 kg
                </option>
              </select>
            </div>
            <div className="filter-space filter-space-rest">
              <label for="pets" className="choose-a-pet">
                Height
              </label>
              <select onChange={(e) => setValues({ ...values, height: e.target.value })} id="pets" name="pets" className="pets-type-input">
                <option className="input-option">
                  All
                </option>
                <option className="input-option" value={"short"}>
                  1 cm - 20 cm
                </option>
                <option className="input-option" value={"medium"}>
                  21 cm - 40 cm
                </option>
                <option className="input-option" value={"tall"}>
                  41 cm - 70 cm
                </option>
                <option className="input-option" value={"xtall"}>
                  More than 70 cm
                </option>
              </select>
            </div>
          </div>
        )}
        <hr className="search-hr" />
      </div>
    </>
  );
}
