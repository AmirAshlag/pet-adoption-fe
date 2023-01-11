import axios from "axios";
import React from "react";
import { useState } from "react";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/UpdatePetModal.css";
import storage from "../config";
import { ref, uploadBytes } from "firebase/storage";

const UpdatePetModal = (props) => {
  console.log(props);
  const {
    name,
    type,
    breed,
    height,
    weight,
    color,
    bio,
    id,
    hypoallergenic,
    adopted,
  } = props.data;
  const setModalData = props.setModalData;
  const GetPets = props.GetPets;

  const [hypoallergenic2, setHypoallergenic] = useState(hypoallergenic);
  const [isAdopted, setIsAdopted] = useState(adopted);
  const [name2, setName] = useState(name);
  const [type2, setType] = useState(type);
  const [height2, setHeight] = useState(height);
  const [weight2, setWeight] = useState(weight);
  const [color2, setColor] = useState(color);
  const [bio2, setBio] = useState(bio);
  const [file2, SetFile] = useState("");
  const [error, setError] = useState(false);
  const [breed2, setBreed] = useState(breed);

  function UpdatePet() {
    const newPetList = [
      hypoallergenic2,
      isAdopted,
      name2,
      type2,
      height2,
      weight2,
      color2,
      breed2,
      bio2,
    ];
    const updatedPet = {
      hypoallergenic: hypoallergenic2,
      adopted: isAdopted,
      name: name2,
      type: type2,
      height: height2,
      weight: weight2,
      color: color2,
      breed: breed2,
      bio: bio2,
      id: id,
    };
    for (let item of newPetList) {
      if (item === "") {
        setError(true);
        return "error";
      }
    }
    console.log(updatedPet);
    axios.put("http://localhost:8080/pet/update", updatedPet).then((res) => {
      const storageRef = ref(storage, `${res.data.id}`);
      if (!file2){
        GetPets()
      }
      if (file2) {
        uploadBytes(storageRef, file2)
          .then((snapshot) => {
            console.log({ ...res.data, file: snapshot });
            GetPets()
            return { ...res.data, file: snapshot };
          })
      }
    })

    setHypoallergenic("");
    setIsAdopted("");
    setName("");
    setType("");
    setHeight("");
    setWeight("");
    setColor("");
    setBio("");
    setBreed("");
    SetFile("")
    setError(false);
  }

  return (
    <div>
      <div
        className="add-container2"
        onClick={() => {
          setModalData("");
        }}
      />
      <div className="add-pet-form2">
        <div className="form__group field">
          <label htmlFor="name" className="form__lab el">
            <b>Name:</b>
          </label>
          <input
            type="input"
            value={name2}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form__field2"
            placeholder="Name"
            name="name"
            id="name"
            required
          />
        </div>
        <div className="form__group field">
          <input
            type="input"
            value={type2}
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="form__field2"
            placeholder="Type"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Type:</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="input"
            value={breed2}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            className="form__field2"
            placeholder="Breed"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Breed:</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="number"
            value={height2}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
            className="form__field2"
            placeholder="Height"
            name="name"
            id="name"
            min="5"
            max="100"
            step="1"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Height (cm):</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="number"
            value={weight2}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            className="form__field2"
            placeholder="Weight"
            name="name"
            id="name"
            min="1"
            max="60"
            step="1"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Weight (kg:)</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="input"
            value={color2}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            className="form__field2"
            placeholder="Color"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Color:</b>
          </label>
        </div>
        <label htmlFor="file" className="pic-label">
          <b>Choose pet picture:</b>
        </label>
        <input
          type="file"
          className="file"
          name="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            SetFile(e.target.files[0]);
          }}
        ></input>
        <div className="form__group field">
          <span>Adopted:</span>
          <input
            type="radio"
            className="radio"
            name="adopted"
            value={"Adopted"}
            defaultChecked={isAdopted == "adopted"}
            onClick={(e) => {
              setIsAdopted(e.target.value);
              console.log(e.target.value);
            }}
          />
          <span className="right">Not adopted:</span>
          <input
            type="radio"
            className="radio"
            name="adopted"
            value={"not adopted"}
            defaultChecked={isAdopted == "not adopted"}
            onClick={(e) => {
              setIsAdopted(e.target.value);
              console.log(e.target.value);
            }}
          />
          <span>Fosterd:</span>
          <input
            type="radio"
            className="radio"
            name="adopted"
            value={"fosterd"}
            defaultChecked={isAdopted == "fosterd"}
            onClick={(e) => {
              setIsAdopted(e.target.value);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="name" className="form__label">
            <b>Adoption status:</b>
          </label>
        </div>
        <div className="form__group field">
          <span>Yes:</span>
          <input
            type="radio"
            className="radio"
            name="alregenic"
            value={"is hypoallergenic"}
            defaultChecked={!hypoallergenic2}
            onClick={(e) => {
              setHypoallergenic(e.target.value);
              console.log(e.target.value);
            }}
          />
          <span className="right">No:</span>
          <input
            type="radio"
            className="radio"
            name="alregenic"
            value={"isn`t hypoallergenic"}
            defaultChecked={hypoallergenic2}
            onClick={(e) => {
              setHypoallergenic(e.target.value);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="name" className="form__label">
            <b>Hypoallergenic:</b>
          </label>
        </div>
        <label className="bio-label">
          <b>Pet bio:</b>
        </label>
        <textarea
          maxLength="130"
          className="bio"
          placeholder="Bio..."
          value={bio2}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        {error && <div className="error">Fill in everything</div>}
        <button className="button-4" onClick={UpdatePet}>
          update
        </button>
      </div>
    </div>
  );
};

export default UpdatePetModal;
