import React from 'react'
import Navbar from '../components/Navbar'
import AdminPetList from '../components/AdminPetList';
import AdminUsersList from '../components/AdminUsersList';
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/AdminLists.css";

const AdminLists = () => {
  return (
    <div className="admin-body">
      <Navbar class={"nav-container2"} />
      <div className="lists-container">
        <AdminPetList />
        <AdminUsersList popUp={false} setPop={()=>{}}/>
      </div>
    </div>
  );
}

export default AdminLists
