import { Link } from "react-router-dom";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/Navbar.css";
import { useContext, useState } from "react";
import { MainContext } from "../App";
import axios from "axios";
import LogOutModal from "./LogOutModal";

const Navbar = (props) => {
  const { currentToken } = useContext(MainContext);
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true)
  }
  return (
    <nav>
      <ul className={props.class}>
        <li>
          <Link className="nav-item" to="/mypets">
            My pets
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_kz7SFtDDwaUobbWpdIOhCrwy7CjR6eOHg&usqp=CAU"
              className="home-img"
              alt="not available"
            />
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/home">
            Home
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/buildings-architecture-real-estate/home-icon.png"
              className="home-img"
              alt="not available"
            />
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/search">
            Search
            <img
              src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
              className="home-img"
              alt="not available"
            />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
              className="profile-link-img"
              alt="not available"
            />
          </Link>
        </li>
        {currentToken.isAdmin && (
          <li>
            <Link className="nav-item" to="/addpet">
              Add pet(admin)
            </Link>
          </li>
        )}
        {currentToken.isAdmin && (
          <li>
            <Link className="nav-item" to="/adminlists">
              Admin data(admin)
            </Link>
          </li>
        )}
        <li className="logout" onClick={showModal}>
          logout
        </li>
      </ul>
      {modal && <LogOutModal setModal={setModal} />}
    </nav>
  );
};

export default Navbar;
