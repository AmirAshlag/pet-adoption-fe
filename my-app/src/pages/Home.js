import Navbar from "../components/Navbar";
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/Home.css";
import { useContext } from "react";
import { MainContext } from "../App";

const Home = () => {
  const { currentToken } = useContext(MainContext);
  return (
    <div className="home-body">
      <Navbar class={"nav-container"} />
      <div className="home-background">
        <div className="home-welcome">
          {`Welcome ${currentToken.firstName} ${currentToken.lastName}, to our pet adoption site`}
        </div>
      </div>
    </div>
  );
};

export default Home;
