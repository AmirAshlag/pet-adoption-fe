import { useContext, useEffect } from "react";
import { MainContext } from "../App";
import axios from "axios";
import { redirect } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { currentToken, setCurrentToken } = useContext(MainContext);
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/check", { withCredentials: true })
      .then((res) => {
        console.log(res.data.token);
        setCurrentToken(res.data.token);
      });
  }, []);

  return currentToken.isAdmin == "true" ? children : "";
};

export default AdminRoute;
