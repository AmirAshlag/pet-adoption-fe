import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/ProfileSettings.css";
import { MainContext } from "../App";


const ProfileSettings = () => {
  const { currentToken, setCurrentToken } = useContext(MainContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [Error, setError] = useState(false);

   useEffect(() => {
     axios
       .get("http://localhost:8080/user/check", { withCredentials: true })
       .then((res) => {
         console.log(res.data.token);
         setCurrentToken(res.data.token);
       });
   },[]);

  function updateUser() {
    setError(false)
    setIsSuccessful(false)
    const user = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      id: currentToken.id
    };

    axios
      .put("http://localhost:8080/user/update", user, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.approved == "loggedIn") {
          setIsSuccessful(true);
          setPhoneNumber("");
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setCurrentToken(res.data.token);
        } else {
          setError(true);
        }
      });
  }

  return (
    <div className="settings-container">
      <Navbar class={"nav-container2"} />
      <div className="profile-settings">
        <h2>change info</h2>
        <div className="container">
          <label htmlFor="Fname">
            <b>Fisrt name</b>
          </label>
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="first name"
            name="Fname"
            required
            className="Modal-input"
          />
          <label htmlFor="Lname">
            <b>Last name</b>
          </label>
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="last name"
            name="Lname"
            required
            className="Modal-input"
          />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            name="email"
            required
            className="Modal-input"
          />

          <label htmlFor="number">
            <b>phone number</b>
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            type="text"
            placeholder="phone number"
            name="number"
            className="Modal-input"
            required
          />
          <label htmlFor="psw2">
            <b>Password</b>
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            name="psw2"
            className="Modal-input"
            autocomplete="new-password"
            required
          />

          <button type="submit" className="modal-button" onClick={updateUser}>
            Save
          </button>
          {isSuccessful && <div className="success">User updated!</div>}
          {Error && <div className="emptyError">Couldent update.</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
