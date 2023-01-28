import React, {useState} from 'react'
import Axios from 'axios';
import Cookies from "universal-cookie";

function SingUp({setIsAuth}) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const singUp = () => {
    Axios.post("https://tic-tac-toe-react-api.vercel.app/singup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  }
  return (
    <div className='singUp'>
      <label>Sing Up</label>
      <input type="text" 
      onChange={(event)=>{
        setUser({...user, firstName : event.target.value})
      }} 
      placeholder="last name"
      />
      <input type="text" 
      onChange={(event)=>{
        setUser({...user, lastName : event.target.value})
      }} 
      placeholder="first name"
      />
      <input type="text" 
      onChange={(event)=>{
        setUser({...user, username : event.target.value})
      }} 
      placeholder="user name"
      />
      <input type="password" 
      onChange={(event)=>{
        setUser({...user, password : event.target.value})
      }} 
      placeholder="password"
      />
      <button onClick={singUp}><h5> Sing Up <span></span><span></span><span></span><span></span></h5></button>
    </div>
  )
}

export default SingUp;