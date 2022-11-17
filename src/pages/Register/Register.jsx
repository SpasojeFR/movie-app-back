import './register.scss';
import { useState } from "react";
import Add from "../../images/addAvatar.png";
import { auth, storage, db } from "../../firebase"
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";



const Register = () => {

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const googleProvied = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]; 
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
             navigate("/");
          } catch (err) {
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

  const handleGoogleSubmit = async () => {
    try { 
      await signInWithPopup(auth, googleProvied);
      navigate("/");
    } catch(e) {
      throw new Error(e.message)
    }
  }
  
  return (
    <div className="formContainer">
    <div className="formWrapper">

        <h1 className="logo">Movie app</h1>
        <p className="title">register</p>

        {err && <span> something went wrong</span>}
        {loading && <span> loading...</span> }

        <form onSubmit={handleFormSubmit}>
          
            <input type="text" placeholder="display name"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input style={{display: "none"}} type="file" id="file"/>
            <label htmlFor="file">
                <img src={Add} alt="avatar" />
                <span>add an avatar</span>
            </label>
            
          <button>sign up</button>
           
        </form>

        <div className='googleSignp'>
            <p>Or signup using google</p>
            <button onClick={handleGoogleSubmit}>sign up using google</button>
        </div>

        <p>You have an account? <Link to="/login"> Login. </Link></p>
    </div>
   
</div>
  )
}

export default Register