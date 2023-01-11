import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/UserModal.css";
import { useEffect, useState } from "react";
import axios from "axios";

const UserModal = ({ setModalData, ModalData, GetUsers }) => {
  const [userspets, setUsersPets] = useState([]);

  useEffect(() => {
    setUsersPets([]);
    axios.get(`http://localhost:8080/pet/${ModalData.id}`).then((res) => {
      console.log(res.data);
      setUsersPets(res.data);
    });
  }, []);

  function makeAdmin() {
    axios.put("http://localhost:8080/user/makeAdmin", ModalData).then(() => {
      setModalData({ ...ModalData, isAdmin: true });
      GetUsers()
    });
  }
  console.log(ModalData);
  return (
    <div>
      <div
        className="add-container2"
        onClick={() => {
          setModalData("");
        }}
      />
      <div className="user-modal">
        <div className="user-data-container">
          <span className="user-modal-data">
            <b>Full-name: </b>
            {`${ModalData.firstName} ${ModalData.lastName}`}
          </span>
          <span className="user-modal-data2">
            <b>Email: </b>
            {ModalData.email}
          </span>
        </div>
        <div className="user-data-container">
          <span className="user-modal-data">
            <b>Phone-number: </b>
            {ModalData.phoneNumber}
          </span>
          <span className="user-modal-data2">
            <b>Admin: </b>
            {ModalData.isAdmin ? "is admin" : "not admin"}
          </span>
          {!ModalData.isAdmin && (
            <button className="admin-button" onClick={makeAdmin}>
              Make admin
            </button>
          )}
        </div>
        <div className="users-pets">
          {userspets.length === 0 && <h2 className="no-pets">no pets owned</h2>}
          {userspets &&
            userspets.map((pet) => {
              return (
                <div key={pet.id} className="pet-container2">
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
    </div>
  );
};

export default UserModal;
