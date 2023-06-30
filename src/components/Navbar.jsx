import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" className="profilepic"/>
        <span className="userName">{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className="logoutbtn">logout</button>
      </div>
    </div>
  );
};

export default Navbar;
