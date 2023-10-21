import React, { useContext, useState } from 'react'
import { collection, query, where ,getDocs, setDoc, doc ,updateDoc, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase";
import { AuthContext } from '../context/AuthContext';

function Search() {
  const [username, setUsername] = useState("");
  const [user , setUser] = useState(null);
  const [err , setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async ()=>{
    const q = query(collection(db, "users"), where('displayName','==',username));

    try{
      setErr(false);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          setUser(doc.data())
      });

    }catch(err){
      setErr(true);
    }
  }

  const handleSelect = async()=>{

    const combinedId = (currentUser.uid > user.uid) ? currentUser.uid+user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDocs(collection(db,"chats"),combinedId);
      console.log(res);
      if(!res.exists){
        await setDoc(doc(db,"chats",combinedId),{
          messages : []
        });

        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL
          },
          [combinedId+".date"] : serverTimestamp(),
        })

        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp(),
        })

      }
    }catch(err){
      console.log(err.message);
    }

    setUsername('');
    setUser(null);

  }

  const handlekey = (e)=>{
     if(e.code === 'Enter'){
      handleSearch()
     }
  }

  return (
    <div className='search'>
        <div className="searchForm">
            <input   type="text" placeholder='find a user' onKeyDown={handlekey} value={username}  onChange={(e)=>setUsername(e.target.value)}/>
        </div>

        <div className='chats'>
          {(err )?(<span>User not found</span>):(!user)?null:
            <>
              <div className="userChat" onClick={handleSelect}>
                <div className='imgContainer'>
                    <img src={user.photoURL} alt=""  />
                </div>
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                    <p>Hello</p>
                </div>
              </div>
            </>
          }
        </div>
    </div>
  )
}

export default Search