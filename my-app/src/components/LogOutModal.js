import { useContext } from "react";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/LogOutModal.css";
import axios from "axios";
import { useMatch, useNavigate } from "react-router-dom";
import { MainContext } from "../App";

const LogOutModal = ({ setModal }) => {
  const navigate = useNavigate();
  const { setCurrentToken } = useContext(MainContext);

  function closeModal() {
    setModal(false);
  }

  function logOut() {
    axios
      .get("http://localhost:8080/user/logout", {
        withCredentials: true,
      })
      .then(() => {
        setCurrentToken("")
        setModal(false);
        navigate("/");
      });
  }
  return (
    <div className="logout-modal">
      <div className="logout-text">are you sure you want to log out?</div>
      <div className="logout-btn-container">
        <button className="logout-btn" onClick={logOut}>
          Yes
        </button>
        <button className="logout-btn" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
