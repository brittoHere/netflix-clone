import React, { useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen, LoginScreen, ProfileScreen } from "./Screens";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uuid: userAuth.uuid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unSubscribe;
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="/" element={<LoginScreen />} />
        ) : (
          <>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
