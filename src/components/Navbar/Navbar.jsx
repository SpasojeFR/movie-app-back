import './navbar.scss';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='navbar'>

      <div className='userInfo'>

        <div className='userInfo__img'>
          {currentUser.photoURL && <img src={currentUser?.photoURL} alt="" />}
        </div>

        <p>{currentUser?.displayName}</p>
        
      </div>

      <button onClick={() => signOut(auth)}>logout</button>
    </div>
  )
}

export default Navbar