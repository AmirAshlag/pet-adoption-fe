
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from 'react'
import Home from './pages/Home';
import LoggedOut from "./pages/LoggedOut";
import ProfileSettings from "./pages/ProfileSettings";
import Search from "./pages/Search";
import AdminPage from "./pages/AdminPage";
import AdminLists from "./pages/AdminLists";
import PetPage from "./pages/PetPage";
import AdminRoute from "./privateRoutes/AdminRoute";
import UserRoute from "./privateRoutes/UserRoute";
import MyPets from "./pages/MyPets";

export const MainContext = createContext();

function App() {
  const [currentPet, setCurrentPet] = useState("");
  const [currentToken, setCurrentToken] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  // console.log(currentPet)

  return (
    <MainContext.Provider
      value={{
        setCurrentPet,
        currentPet,
        setCurrentToken,
        currentToken,
        showSaved,
        setShowSaved
      }}
    >
      <Routes>
        <Route
          path="/home"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />
        <Route path="/" element={<LoggedOut />} />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <ProfileSettings />
            </UserRoute>
          }
        />
        <Route
          path="/mypets"
          element={
            <UserRoute>
              <MyPets />
            </UserRoute>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/adminlists"
          element={
            <AdminRoute>
              <AdminLists />
            </AdminRoute>
          }
        />
        <Route
          path="/addpet"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="/pet/:id" element={<PetPage />} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
