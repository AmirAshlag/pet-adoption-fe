import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/AdminpetList.css";
import { useEffect,useState } from "react";
import axios from "axios";
import UpdatePetModal from "./UpdatePetModal";

const AdminPetList = () => {
    const [petList, setPetList] = useState('')
    const [ModalData, setModalData] = useState("");
    function GetPets(){
        axios.get("http://localhost:8080/pet/all").then((results)=>{
          // add file here
            console.log(results.data)
            setPetList(results.data)
        })
    }
    useEffect(()=>{
        GetPets()
    },[])

  return (
    <div className="admin-list">
      {ModalData && (
        <UpdatePetModal
          data={ModalData}
          setModalData={setModalData}
          GetPets={GetPets}
        />
      )}
      <h1 className="admin-title">Pets</h1>
      <div>
        {petList &&
          petList.map((pet) => {
            return (
              <div
                key={pet.id}
                className="pet-container"
                onClick={() => {
                  setModalData(pet);
                }}
              >
                <span>
                  <b>Name: </b>
                  {pet.name}
                </span>
                <span>
                  <b>Type: </b>
                  {pet.type}
                </span>
                <span>
                  <b>Breed: </b>
                  {pet.breed}
                </span>
                <span>
                  <b>Adoption status: </b>
                  {pet.adopted}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AdminPetList
