import './login.scss';
import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/");
    } catch (e) {
      setErr(true);
    }
  };
  
  return (
    <div className="formContainer">
    <div className="formWrapper">
        <h1 className="logo">movie app</h1>
        <p className="title">login</p>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button>login</button>
            {err && <span> something went wrong</span> }
        </form>

        <p>You don't have an account? <Link to="/register"> Register. </Link> </p>
        
    </div>
</div>
  )
}

export default Login