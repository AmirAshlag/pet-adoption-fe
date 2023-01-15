import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/AdvancedSearch.css";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "../App";
import axios from "axios";
import SearchResults from "./SearchResults";

const AdvancedSearch = ({}) => {
  const [isAdopted, setIsAdopted] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState("");
  const [searchList, setSearchList] = useState("");
  const [loader, setLoader] = useState(false);

  console.log("Advance");

  function clickHandler() {
    setLoader(true);
    // setSearchList([]);
    axios
      .get(
        `http://localhost:8080/search/animal?type=${type}&color=${color}&adopted=${isAdopted}&hypoallergenic=${hypoallergenic}&height=${height}&weight=${weight}`
      )
      .then((result) => {
        if (result.data.length == 0) {
          setLoader(false);
        }
        localStorage.setItem("list", JSON.stringify(result.data));
        setSearchList(result.data);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("list")) {
      const list = JSON.parse(localStorage.getItem("list"));
      setSearchList(list);
    }
  }, []);

  return (
    <div>
      <div className="Advanced-search-container">
        <div className="form__group field">
          <input
            type="input"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="form__field2"
            placeholder="Type"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Type:</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="input"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            className="form__field2"
            placeholder="Color"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Color:</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="number"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            className="form__field2"
            placeholder="Weight"
            name="name"
            id="name"
            min="1"
            max="60"
            step="0.5"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Weight (kg:)</b>
          </label>
        </div>
        <div className="form__group field">
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
            className="form__field2"
            placeholder="Height"
            name="name"
            id="name"
            min="5"
            max="100"
            required
          />
          <label htmlFor="name" className="form__label">
            <b>Height (cm):</b>
          </label>
        </div>
        <div className="form__group field">
          <span>Adopted:</span>
          <input
            type="radio"
            className="radio"
            name="adopted"
            value={"Adopted"}
            onClick={(e) => {
              setIsAdopted(e.target.value);
              console.log(e.target.value);
            }}
          />
          <span className="right">Not adopted:</span>
          <input
            type="radio"
            className="radio"
            name="adopted"
            value={"not adopted"}
            onClick={(e) => {
              setIsAdopted(e.target.value);
              console.log(e.target.value);
            }}
          />
          <span>Fosterd:</span>
          <input
            type="radio"
            className="radio"
            name="adopted"
            value={"fosterd"}
            onClick={(e) => {
              setIsAdopted(e.target.value);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="name" className="form__label">
            <b>Adoption status:</b>
          </label>
        </div>
        <div className="form__group field">
          <span>Yes:</span>
          <input
            type="radio"
            className="radio"
            name="alregenic"
            value={"is hypoallergenic"}
            onClick={(e) => {
              setHypoallergenic(e.target.value);
              console.log(e.target.value);
            }}
          />
          <span className="right">No:</span>
          <input
            type="radio"
            className="radio"
            name="alregenic"
            value={"isn`t hypoallergenic"}
            onClick={(e) => {
              setHypoallergenic(e.target.value);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="name" className="form__label">
            <b>Hypoallergenic:</b>
          </label>
        </div>
        <button className="button-2" onClick={clickHandler}>
          Search
        </button>
      </div>
      {loader && <span className="loader"></span>}
      <SearchResults searchList={searchList} setLoader={setLoader} />
    </div>
  );
};

export default AdvancedSearch;
