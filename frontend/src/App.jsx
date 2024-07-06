import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { getUserProfile } from "./redux/auth/action";
import { getTasks } from "./redux/task/action";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.auth);
  const toast = useToast();
  useEffect(() => {
    dispatch(getUserProfile())
      .then((r) => {
        navigate("/");
      })
      .then((r) => dispatch(getTasks()));
  }, [dispatch, isAuth]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
