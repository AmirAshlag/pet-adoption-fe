import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/AddPetForm.css";
import { useState } from "react";
import axios from "axios";
import storage from "../config";
import { ref, uploadBytes } from "firebase/storage";


const AddPetForm = () => {
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [isAdopted, setIsAdopted] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [bio, setBio] = useState("");
  const [file, SetFile] = useState("");
  const [error, setError] = useState(false);
  const [breed, setBreed] = useState("");

  function createNewPet() {
    const newPetList = [
      hypoallergenic,
      isAdopted,
      name,
      type,
      height,
      weight,
      color,
      breed,
      bio, 
      file
    ];
    for (let item of newPetList) {
      if (item === "") {
        setError(true);
        return "error";
      }
    }
    const newPet = {
      hypoallergenic: hypoallergenic,
      adopted: isAdopted,
      name: name,
      type: type,
      height: Number(height),
      weight: Number(weight),
      color: color,
      breed: breed,
      bio: bio
    };
    axios.post("http://localhost:8080/addpet", newPet).then((answer) => {
      console.log(answer.data);
      const storageRef = ref(storage, `${answer.data.id}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log(snapshot)
        });
    });

    setHypoallergenic("");
    setIsAdopted("");
    setName("");
    setType("");
    setHeight("");
    setWeight("");
    setColor("");
    setBio("");
    setBreed("")
    SetFile("")
  }

  return (
    <div className="add-container">
      <div className="add-pet-form">
        <div className="form__group field">
          <label htmlFor="name" className="form__lab el">
            <b>Name:</b>
          </label>
          <input
            type="input"
            value={name}
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
            value={type}
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
            value={breed}
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
            value={height}
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
            value={weight}
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
            value={color}
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
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            console.log(bio)
          }}
        />
        {error && <div className="error">Fill in everything</div>}
        <button className="button-4" onClick={createNewPet}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddPetForm;
