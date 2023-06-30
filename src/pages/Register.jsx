import React, { useState } from "react";
import Add from "../img/addAvatar.png";
// import defaultProfile from "../img/default.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [passError, setPassError] = useState(false);
  // const [profileErr, setProfileErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // console.log(e.target[3].files[0])
    let file = e.target[3].files[0];
    // if (!file) {
    //   setProfileErr(true)
    // }else{
    //   setProfileErr(false)
    // }
    // if(password.length < 6){
    //   setPassError(true)
    // }else{
    //   setPassError(false)
    // }
    sendApi(email, password, displayName, file);
  };
  const sendApi = async (email, password, displayName, file) => {
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper register">
        <h2 style={{ fontSize: "1.8rem" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Your name"
            className="logintextbox"
          />
          <br />
          <input
            required
            type="email"
            placeholder="Email"
            className="logintextbox"
          />
          <br />
          <input
            required
            type="password"
            placeholder="Password"
            className="logintextbox"
            onChange={(e) => {
              e.target.value.length >= 6
                ? setPassError(false)
                : setPassError(true);
            }}
          />
          <br />
          {passError === true ? (
            <span className="errorMessage">
              ❕ Should have 6 letters password
            </span>
          ) : null}
          <input style={{ display: "none" }} type="file" id="file" />
          <label
            htmlFor="file"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: "10px 0",
              boxShadow: "1px 1px 10px 2px #ffadf4",
              borderRadius: "10px",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            <img src={Add} alt="" style={{ height: "40px", width: "40px" }} />
            <span>Add an avatar</span>
          </label>
          {/* {profileErr === true ? (
            <span className="errorMessage">
              ❕ please upload a profile pic ...
            </span>
          ) : null} */}
          <br />
          <button disabled={loading} className="loginbutton">
            Sign up
          </button>
          {loading && !passError && <span>Uploading image please wait...</span>}
          {err && <span className="errorMessage">Something went wrong</span>}
        </form>
        <p style={{ color: "#222" }}>
          Already have an account?{" "}
          <Link to="/login" className="registerLogin">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
