import React from "react";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/AdminUsersList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UserModal from "./UserModal";

const AdminUsersList = ({ popUp, setPop, setOwner }) => {
  const [userList, setUsersList] = useState("");
  const [ModalData, setModalData] = useState("");

  function GetUsers() {
    axios.get("http://localhost:8080/user/all").then((results) => {
      console.log(results.data);
      setUsersList(results.data);
    });
  }
  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <div className={popUp ? "admin-list3" : "admin-list2"}>
      {ModalData && (
        <UserModal
          ModalData={ModalData}
          setModalData={setModalData}
          GetUsers={GetUsers}
        />
      )}
      <h1 className={popUp ? "admin-title3" : "admin-title2"}>
        {popUp ? "Select owner" : "Users"}
      </h1>
      {popUp && (
        <button
          className="close"
          onClick={() => {
            setPop(false);
          }}
        >
          X
        </button>
      )}
      <div>
        {userList &&
          userList.map((user) => {
            return (
              <div
                key={user.id}
                className="users-container"
                onClick={
                  popUp
                    ? () => {
                        setOwner(user.id);
                        setPop(false);
                      }
                    : () => {
                        setModalData(user);
                      }
                }
              >
                <span>
                  <b>First-Name: </b>
                  {user.firstName}
                </span>
                <span>
                  <b>Last-name: </b>
                  {user.lastName}
                </span>
                <span>
                  <b>Email: </b>
                  {user.email}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminUsersList;
