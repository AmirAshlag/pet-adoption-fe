import { useState, useEffect, useContext } from "react";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/MyPets.css";
import Navbar from "../components/Navbar";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import { MainContext } from "../App";

const MyPets = () => {
  const [searchList, setSearchList] = useState("");
  const [loader, setLoader] = useState(false);
  const { currentToken, setCurrentToken, showSaved, setShowSaved } =
    useContext(MainContext);
  const [noPets, setNoPets] = useState(false);

  function getMyPets() {
    axios
      .get(`http://localhost:8080/pet/${currentToken.id}`)
      .then((res) => {
        // console.log(res.data)
        setSearchList(res.data);
        return res;
      })
      .then((res) => {
        console.log(res.data.length);
        if (res.data.length === 0) {
          setLoader(false);
          setNoPets(true);
        }
      });
  }

  function toggele(value) {
    setNoPets(false);
    console.log(showSaved);
    if (value) {
      axios
        .get(`http://localhost:8080/pet/getSavedPets/${currentToken.id}`)
        .then((res) => {
          setSearchList(res.data);
          if (res.data.length === 0) {
            setLoader(false);
            setNoPets(true);
          }
        });
    } else {
      getMyPets();
    }
  }

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:8080/user/check", { withCredentials: true })
      .then((res) => {
        setCurrentToken(res.data.token);
      });
    toggele(showSaved);
  }, []);

  return (
    <div className="mypets-container">
      <Navbar class={"nav-container2"} />
      <h1
        className={showSaved ? "Saved-pets-title" : "my-pets-title"}
        onClick={() => {
          setShowSaved(!showSaved);
          toggele(!showSaved);
        }}
      >
        {showSaved ? "Saved Pets" : "My pets"}
      </h1>
      {loader && <span className="loader"></span>}
      {noPets && (
        <h1 className="no-pets-owned">
          {showSaved ? "no pets saved" : "no pet owned"}
        </h1>
      )}
      <SearchResults searchList={searchList} setLoader={setLoader} />
    </div>
  );
};

export default MyPets;
