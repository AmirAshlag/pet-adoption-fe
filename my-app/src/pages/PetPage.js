import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../App";
import Navbar from "../components/Navbar";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/PetPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "../config";
import LoggedOutNav from "../components/LoggedOutNav";

const PetPage = () => {
  const {
    currentPet,
    currentToken,
    setCurrentPet,
    setCurrentToken,
    setShowSaved,
  } = useContext(MainContext);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.split("/")[2];
  // console.log(!currentToken);

  useEffect(() => {
    let pet;
    axios
      .get(`http://localhost:8080/pet/petid/${id}`)
      .then((res) => {
        pet = res.data[0];
        return res.data[0];
      })
      .then(() => {
        getDownloadURL(ref(storage, `${pet.id}`)).then((url) => {
          pet = { ...pet, image: url };
          setCurrentPet(pet);
        });
        axios
          .get("http://localhost:8080/user/check", { withCredentials: true })
          .then((res) => {
            // console.log(res.data.token);
            setCurrentToken(res.data.token);
            return res.data.token;
          })
          .then((res) => {
            if (res) {
              axios
                .get(`http://localhost:8080/pet/checkSaved/${res.id}/${pet.id}`)
                .then((res) => {
                  console.log(res.data);
                  if (res.data.length > 0) {
                    console.log("hey");
                    setSaved(true);
                  }
                });
            }
          });
      });
  }, []);

  function UnSave(nav) {
    axios
      .delete(
        `http://localhost:8080/pet/unSave/${currentToken.id}/${currentPet.id}`
      )
      .then(() => {
        if (nav) {
          setShowSaved(true);
          navigate("/mypets");
        }
      });
  }

  function AdoptOrFoster(choice) {
    if (!currentToken) {
      navigate("/");
      return null;
    } else {
      let data = {
        pet: { ...currentPet, adopted: choice },
        user: currentToken,
      };
      axios.put("http://localhost:8080/pet/adoptOrFoster", data).then((res) => {
        console.log(res);
        setCurrentPet(res);
        UnSave(false);
        setShowSaved(false);
        navigate("/mypets");
      });
    }
  }

  function ReturnPet() {
    axios.put("http://localhost:8080/pet/return", currentPet).then(() => {
      navigate("/mypets");
    });
  }

  function SavePet() {
    if (!currentToken) {
      navigate("/");
      return null;
    } else {
      axios.post("http://localhost:8080/pet/save", {
        pet: currentPet,
        user: currentToken,
      });
      setShowSaved(true);
      navigate("/mypets");
    }
  }

  console.log(saved);
  return (
    <div className="pet-body">
      {currentToken ? (
        <Navbar class={"nav-container2"} />
      ) : (
        <LoggedOutNav class={"nav-container3"} />
      )}
      <div key={currentPet.id} className="pet">
        <div>
          <img src={currentPet.image} className="pet-image" alt="cant get" />
        </div>
        <div className="upper-bio">
          <span>
            <b>Breed: </b>
            {currentPet.breed}
          </span>
          <span className="right">
            <b>Name: </b>
            {currentPet.name}
          </span>
          <span className="right">
            <b>Status: </b>
            {currentPet.adopted}
          </span>
        </div>
        <div className="lower-bio">
          <span>
            <b>Color: </b>
            {currentPet.color}
          </span>
          <span className="right">
            <b>Weight: </b>
            {currentPet.weight}
          </span>
          <span className="right">
            <b>Height: </b>
            {currentPet.height}
          </span>
          <span className="right">
            <b>Hypoallergenic: </b>
            {currentPet.hypoallergenic}
          </span>
        </div>
        <div className="pet-bio">
          {" "}
          <b>Bio: </b>
          {currentPet.bio}
        </div>
        <div className="button-container">
          {(currentPet.adopted === "not adopted" ||
            (currentPet.adopted == "fosterd" &&
              currentPet.owner == currentToken.id)) && (
            <button
              className="adopt-button"
              onClick={() => {
                AdoptOrFoster("adopted");
              }}
            >
              Adopt
            </button>
          )}
          {currentPet.adopted == "not adopted" && (
            <button
              className="foster-button"
              onClick={() => {
                AdoptOrFoster("fosterd");
              }}
            >
              Foster
            </button>
          )}
          {currentPet.owner != currentToken.id && saved && (
            <button className="foster-button" onClick={()=>{UnSave(true)}}>
              Unsave
            </button>
          )}
          {!saved &&
            currentToken.id != undefined &&
            currentPet.owner != currentToken.id && (
              <button className="foster-button" onClick={SavePet}>
                Save
              </button>
            )}
          {currentPet.owner == currentToken.id && currentPet.owner && (
            <button className="foster-button" onClick={ReturnPet}>
              Return pet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetPage;
