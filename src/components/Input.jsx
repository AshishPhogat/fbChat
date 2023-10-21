import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState ,useContext} from 'react'
import { db, storage } from '../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { ChatContext} from '../context/ChatContext';


function Input() {
  const [error,setError] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const handleSend = async ()=>{  
    setError(false);
    if(img){
      const storageRef = ref(storage, `/chatsImg/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state-changed',
        (snapshot)=>{
        },
        (error) => {
          console.log("uploadTask error");
          setError(true);
        }, 
        async() => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages : arrayUnion({
                id : uuid(),
                text, 
                sendId : currentUser.uid,
                date : Timestamp.now(),
                img: downloadURL
              })
            })
          });
        }
      );

    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages : arrayUnion({
          id : uuid(),
          text, 
          sendId : currentUser.uid,
          date : Timestamp.now(),

        })
      })
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"] : {
        text
      },
      [data.chatId+".date"] : serverTimestamp()
    })

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"] : {
        text
      },
      [data.chatId+".date"] : serverTimestamp()
    })

    setText("");
    setImg(null);

  }

  return (
    <div className='input'>
      <input type="text"  placeholder='Type something...' value={text} onChange={(e)=>setText(e.target.value)}/>
      <div className="send">
        <span>Attachment</span>
        <span>Img</span>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input