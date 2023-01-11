import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/BasicSearch.css";
// import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SearchResults from "./SearchResults";

const BasicSearch = () => {
  const [type, setType] = useState("")
  const [searchList, setSearchList] = useState("")
  const [loader, setLoader] = useState(false);

  function clickHandker(){
    setLoader(true)
    axios.get(`http://localhost:8080/search/pet?type=${type}`).then((res)=>{
      if (res.data.length == 0) {
        setLoader(false);
      }
      setSearchList(res.data);
    })
  }

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
}

export default BasicSearch