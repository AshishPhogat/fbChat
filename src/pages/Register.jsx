import React, { useState } from 'react'
import {auth , storage  , db } from '../firebase'
import {createUserWithEmailAndPassword , updateProfile} from 'firebase/auth';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {useNavigate ,Link} from "react-router-dom";

function Register() {
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    setError(false);
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state-changed',
        (snapshot)=>{
        },
        (error) => {
          console.log("uploadTask error");
          setError(true);
        }, 
        async() => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              await updateProfile(res.user,{
                displayName,
                photoURL : downloadURL
              })

              await setDoc(doc(db,'users',res.user.uid),{
                uid : res.user.uid,
                displayName,
                email,
                photoURL : downloadURL
              })

              await setDoc(doc(db,'userChats',res.user.uid),{});
              navigate("/");
          });
        }
      );

     
    }catch(err){
      console.log(err.message)
      setError(true);
    }




  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span>
                <h2 className='logo'>FB Chat</h2>
                <h3 className='title'>Register</h3>
            </span>
            <form onSubmit={handleSubmit}>
                <input type ="text" placeholder='displayName'></input>
                <input type ="email" placeholder='email'></input>
                <input type ="password" placeholder='password'></input>
                <label >Add Avatar:</label>
                <input  type ="file" id="file" ></input>
                <button>Sign Up</button>
                {error && <span>Error Occured</span>}
            </form>
            <p>You do have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register