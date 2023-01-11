import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/SearchResults.css";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../App";
import { useNavigate } from "react-router-dom";
import storage from "../config";
import { getDownloadURL, ref } from "firebase/storage";

const SearchResults = (props) => {
  let searchList = props.searchList;
  let setLoader = props.setLoader;
  const [updatedList, setUpdatedList] = useState([]);
  const { setCurrentPet } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUpdatedList([])
      if (searchList) {
        let empty = [];
        searchList.map((pet) => {
          getDownloadURL(ref(storage, `${pet.id}`))
            .then((url) => {
              empty.push({ ...pet, image: url });
              if (empty.length == searchList.length) {
                setLoader(false);
                setUpdatedList(empty);
              }
              return { ...pet, image: url };
            })
            .catch((e) => {
              console.error(e);
            })
        });
      } 
  }, [searchList]);

  // console.log(searchList);
  return (
    <div className="search-results-container">
      {
        updatedList.map((pet) => {
          return (
            <div
              key={pet.id}
              className="result"
              onClick={() => {
                setCurrentPet(pet);
                navigate(`/pet/${pet.id}`);
              }}
            >
              <div>
                <img src={pet.image} className="pet-image" />
              </div>
              <span>
                <b>Breed: </b>
                {pet.breed}
              </span>
              <span className="right">
                <b>Name: </b>
                {pet.name}
              </span>
              <span className="right">
                <b>Status: </b>
                {pet.adopted}
              </span>
              <div className="search-bio">
                {" "}
                <b>Bio: </b>
                {pet.bio}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResults;
