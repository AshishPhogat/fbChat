import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Navbar() {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className='navbar'>
        <span className="logo">FB Chat</span>
        <div className="user">
            <div className="imgContainer">
              <img src={currentUser.photoURL} alt="" />
            </div>
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar