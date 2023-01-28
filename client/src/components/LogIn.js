import React, {useState} from 'react'
import Cookies from "universal-cookie";
import Axios from 'axios';

function LogIn({setIsAuth}) {
  const cookies = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logIn = () => {
    Axios.post("https://tic-tac-toe-react-api.vercel.app/login", {
      username,
      password,
    }).then((res) => {
      const { token, userId, firstName, lastName, username } = res.data;
      console.log(res);
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  }  
  return (
    <div className='logIn'>
      <label>Log In</label>
      <input type="text" 
      onChange={(event)=>{
        setUsername(event.target.value)
      }} 
      placeholder="user name"
      />
      <input type="password" 
      onChange={(event)=>{
        setPassword(event.target.value)
      }} 
      placeholder="password"
      />
      <button onClick={logIn}><h5> Log In <span></span><span></span><span></span><span></span></h5></button>
    </div>
  )
}

export default LogIn;