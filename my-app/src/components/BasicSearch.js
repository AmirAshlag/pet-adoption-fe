import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/BasicSearch.css";
// import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SearchResults from "./SearchResults";
import { MainContext } from "../App";

const BasicSearch = () => {
  const [type, setType] = useState("");
  const [searchList, setSearchList] = useState("");
  const [loader, setLoader] = useState(false);

  console.log("basic");

  function clickHandker() {
    setLoader(true);
    axios.get(`http://localhost:8080/search/pet?type=${type}`).then((res) => {
      if (res.data.length == 0) {
        setLoader(false);
      }
      setSearchList(res.data);
      localStorage.setItem("list", JSON.stringify(res.data));
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
      <div className="Basic-search-container">
        <div>Type:</div>
        <input
          type="text"
          className="form__field"
          placeholder="Type"
          value={type}
          name="name"
          id="name"
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <button className="button-3" onClick={clickHandker}>
          Search
        </button>
      </div>
      {loader && <span className="loader"></span>}
      <SearchResults searchList={searchList} setLoader={setLoader} />
    </div>
  );
};

export default BasicSearch;
