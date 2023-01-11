import { useState } from "react";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/SignUpModal.css";
import axios from "axios";

const SignupModal = ({ setLoginModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [lengthError, setLengthError] = useState(false);

  function createNewUser() {
    setEmptyError(false);
    setPasswordError(false);
    setLengthError(false);

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    };
    let check = Object.values(newUser);
    let error = false;

    for (let item of check) {
      if (item == "") {
        setEmptyError(true);
        error = true;
        return false;
      }
    }
    if (password.length < 8) {
      setLengthError(true);
      error = true;
    } else if (password != rePassword) {
      setPasswordError(true);
      error = true;
    }
    if (!error) {
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setFirstName("");
      setLastName("");
      setLoginModal(true);
      axios.post("http://localhost:8080/user/create", newUser);
    }
  }

  return (
    <div className="signup-modal">
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
          placeholder="Enter first name"
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
          placeholder="Enter last name"
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
          placeholder="Enter email"
          name="email"
          required
          className="Modal-input"
        />
        <label htmlFor="phone-number">
          <b>Phone number</b>
        </label>
        <input
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          type="text"
          placeholder="Enter phone number"
          name="phone-number"
          required
          className="Modal-input"
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter Password"
          name="psw"
          className="Modal-input"
          required
        />
        <label htmlFor="psw2">
          <b>Re-Password</b>
        </label>
        <input
          value={rePassword}
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
          type="password"
          placeholder="Enter Password"
          name="psw2"
          className="Modal-input"
          required
        />

        <button type="submit" className="modal-button" onClick={createNewUser}>
          Signup
        </button>
        {emptyError && (
          <div className="emptyError">Fill in all the required fields</div>
        )}
        {passwordError && (
          <div className="emptyError">Password doesn't match re-password</div>
        )}
        {lengthError && (
          <div className="emptyError">
            Password must be at least 8 characters
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
