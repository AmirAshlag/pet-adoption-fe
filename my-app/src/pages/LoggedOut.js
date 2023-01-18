import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/pages/LoggedOut.css";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import axios from "axios";
import { useContext } from "react";
import { MainContext } from "../App";

const LoggedOut = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const { setCurrentToken }  = useContext(MainContext)

  useEffect(()=>{
    localStorage.clear()
    axios.get("http://localhost:8080/user/check", {withCredentials: true}).then((res)=>{
      if (res.data.approved == "loggedIn") {
        console.log(res.data.token)
        setCurrentToken(res.data.token);
      }
    })
  },[])
  
  return (
    <div className="logged-out-body">
      {(loginModal || signupModal) && (
        <div
          className="Modalbackground"
          onClick={() => {
            setLoginModal(false);
            setSignupModal(false);
          }}
        />
      )}
      {loginModal && <LoginModal />}
      {signupModal && !loginModal && <SignupModal setLoginModal={setLoginModal} />}
      <div className="description">
        <h1 className="description-header">Welcome to our site!</h1>
        Welcome to our pet adoption center! We are so glad you are considering
        adopting a furry friend from us. Here at our center, we believe in
        finding forever homes for all of our pets and we work tirelessly to
        match each and every one of them with the perfect family.
        <br></br>
        <br></br>
        Our team of dedicated animal care professionals is committed to the
        well-being and happiness of every single pet in our care. We take the
        time to get to know each animal's personality and needs, so we can find
        them the perfect home where they will be loved and cared for.
        <br></br>
        <br></br>
        In addition to providing top-notch care for our pets, we also have a
        wide selection of animals to choose from. Whether you are looking for a
        playful kitten, a loyal dog, or a cuddly rabbit, we have a pet that will
        fit your lifestyle and personality.
        <br></br>
        <br></br>
        Start searching right now:
        <div className="logged-out-search">
          <Link className="nav-item" to="/Search">
            search
            <img
              src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
              className="home-img"
            />
          </Link>
        </div>
      </div>
      <div className="signup-login-container">
        <span>Log in/Join us:</span>
        <button
          className="btn1"
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </button>
        <button
          className="btn1"
          onClick={() => {
            setSignupModal(true);
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default LoggedOut;
