import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 style={{fontSize:"1.8rem"}}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-mail" className="logintextbox"/><br />
          <input type="password" placeholder="Password" className="logintextbox"/><br />
          <button className="loginbutton">Log in</button>
          {err && <span className="errorMessage">Something went wrong</span>}
        </form>
        <p style={{color:"green"}}>Don't have an account? <Link to="/register" className="registerLogin">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;