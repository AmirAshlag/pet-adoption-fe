import AddPetForm from "../components/AddPetForm"
import Navbar from "../components/Navbar"
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/AdminPage.css";

const AdminPage = () => {
  return (
    <div className="admin-body">
      <Navbar class={"nav-container2"} />
      <AddPetForm />
    </div>
  );
}

export default AdminPage
