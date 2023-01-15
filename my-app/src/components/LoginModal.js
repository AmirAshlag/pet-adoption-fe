import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/LoginModal.css";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../App";

const LoginModal = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [Error, setError] = useState(false);
  const navigate = useNavigate()
  const { setCurrentToken } = useContext(MainContext);

  function login() {
    setError(false);
    setEmptyError(false);

    if (!email || !password) {
      setEmptyError(true);
      return "error";
    }
    axios
      .get(
        `http://localhost:8080/user/login?email=${email}&password=${password}`,{withCredentials: true}
      )
      .then((res) => {
        if (!res.data.approved) {
          setError(res.data);
          return false;
        } else {
          console.log(res.data.token)
          localStorage.setItem("basic", true)
          setCurrentToken(res.data.token);
          navigate("/home");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="login-modal">
      <div className="container">
        <label htmlFor="uname">
          <b>Email</b>
        </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Enter Email"
          name="uname"
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

        <button type="submit" className="modal-button" onClick={login}>
          Login
        </button>
        {emptyError && (
          <div className="emptyError">Fill in all the required fields</div>
        )}
        {Error && <div className="emptyError">{Error}</div>}
      </div>
    </div>
  );
};

export default LoginModal;
