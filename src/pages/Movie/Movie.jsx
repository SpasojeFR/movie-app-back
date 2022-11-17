import React, {useEffect, useState} from 'react';
import Comment from '../../components/Comment/Comment';
import { arrayUnion, updateDoc, getDoc, setDoc, doc, onSnapshot  } from "firebase/firestore";
import './movie.scss'
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
import { db } from "../../firebase";
import Navbar from '../../components/Navbar/Navbar';
import NoComments from '../../components/NoComments/NoComments';

function Movie() {

  const {movies} = useContext(MovieContext);
  const {currentUser} = useContext(AuthContext);
  const {id} = useParams();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(()=> {
    const unSub = onSnapshot(doc(db, "comments", id), (doc)=>{
      doc.exists() && setComments(doc.data().comments);
    })

    return () => {
      unSub();
    } 

  }, [id]);

  const handleComment = async () => {

    try {
      const res = await getDoc(doc(db, "comments", id));

      if(!res.exists()) {
        await setDoc(doc(db, "comments", id), {comments:[]});
      }

      await updateDoc(doc(db, "comments", id), {
        comments: arrayUnion({
          text,
          image: currentUser.photoURL
        })
      });

      setText("");

    } catch(e) {
      throw new Error(e.message);
    }
  }

  return (
    <div className="movie"> 

      <div className='movieNavigation'>
        <div className='movieNavigation__info'>
          <div className='goBack'>
            <Link to="/"> 
              <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip10)">
                  <path d="M20.4209 31.3389L44.4209 31.3501" stroke="#FFFFFF" strokeWidth="2"></path>
                  <path d="M32.4265 43.3389L20.4209 31.3389L32.4265 19.3389" stroke="#FFFFFF" strokeWidth="2"></path>
                  </g>
                  <defs>
                  <clipPath id="clip10">
                  <rect width="62" height="62" fill="white" transform="translate(0.420898 0.338867)"></rect>
                  </clipPath>
                  </defs>
              </svg>
            </Link>
          </div>

          <h2>{movies[id]?.title}</h2>
        </div>

        <div className='movieNavigation__navbar'>
          <Navbar />
        </div>
      
      </div>

      <div className='commentsHolder'>

        {comments.length > 0 ? comments.map((comment, index) => 
          <Comment key={index} comment={comment.text} image={comment.image}/>
        ) : <NoComments />}

      </div>
      
      <div className='commentInput'>
        <div className='commentInputForm'>
          <input value={text} onChange={e=>setText(e.target.value)} type="text" placeholder={`Did you liked ${movies[id]?.title ? movies[id]?.title : "..."}?`} />
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>

    </div>
  )
}

export default Movie