import AdvancedSearch from "../components/AdvancedSearch";
import Navbar from "../components/Navbar";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/Search.css";
import BasicSearch from "../components/BasicSearch";
import { useState, useContext, useEffect } from "react";
import { MainContext } from "../App";
import axios from "axios";
import LoggedOutNav from "../components/LoggedOutNav";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [basic, setBasic] = useState(true);
  const { currentToken, setCurrentToken } = useContext(MainContext);
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/check", { withCredentials: true })
      .then((res) => {
        console.log(res.data.token);
        setCurrentToken(res.data.token);
      });
  }, []);

  return (
    <div className="search-container">
      {currentToken ? (<Navbar class={"nav-container2"} />) : ( <LoggedOutNav class={"nav-container3"} />)}
      <div className="toggele">
        <button
          className="toggele-btn"
          onClick={() => {
            setBasic(true);
          }}
        >
          Basic search
        </button>
        <button
          className="toggele-btn"
          onClick={() => {
            setBasic(false);
          }}
        >
          Advanced search
        </button>
      </div>
      {basic && <BasicSearch />}
      {!basic && <AdvancedSearch />}
    </div>
  );
};

export default Search;
