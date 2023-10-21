import React , {useState} from 'react'
import {useNavigate , Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth } from "../firebase";
function Login() {

  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    setError(false);
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }catch(err){
      setError(true);
    }




  }


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span>
                <h2 className='logo'>FB Chat</h2>
                <h3 className='title'>Login</h3>
            </span>
            <form onSubmit={handleSubmit}>
                <input type ="email" placeholder='email'></input>
                <input type ="password" placeholder='password'></input>
                <button>Sign In</button>
            </form>
            {error && <span>Error Occured</span>}
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login