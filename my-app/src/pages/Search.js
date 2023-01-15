import AdvancedSearch from "../components/AdvancedSearch";
import Navbar from "../components/Navbar";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/Search.css";
import BasicSearch from "../components/BasicSearch";
import { useState, useContext, useEffect } from "react";
import { MainContext } from "../App";
import axios from "axios";
import LoggedOutNav from "../components/LoggedOutNav";

const Search = () => {
  const { currentToken, setCurrentToken } = useContext(MainContext);
  const [basic, setBasic] = useState(true);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setBasic(JSON.parse(localStorage.getItem("basic")));
    window.onbeforeunload();
    axios
      .get("http://localhost:8080/user/check", { withCredentials: true })
      .then((res) => {
        setCurrentToken(res.data.token);
      });
  }, []);

  return (
    <div className="search-container">
      {currentToken ? (
        <Navbar class={"nav-container2"} />
      ) : (
        <LoggedOutNav class={"nav-container3"} />
      )}
      <div className="toggele">
        <button
          className="toggele-btn"
          onClick={() => {
            setBasic(true);
            localStorage.setItem("basic", true);
            localStorage.removeItem("list");
          }}
        >
          Basic search
        </button>
        <button
          className="toggele-btn"
          onClick={() => {
            localStorage.setItem("basic", false);
            localStorage.removeItem("list");
            setBasic(false);
          }}
        >
          Advanced search
        </button>
      </div>
      {basic ? <BasicSearch /> : <AdvancedSearch />}
    </div>
  );
};

export default Search;
