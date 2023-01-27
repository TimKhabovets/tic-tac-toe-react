import React, {useState} from 'react' 
import './App.css';
import SingUp from './components/SingUp';
import LogIn from './components/LogIn';
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import {Chat} from "stream-chat-react";
import CreateGame from './components/CreateGame';

function App() {
  const cookies = new Cookies();
  const client = StreamChat.getInstance("rryejj45awqa");
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);

  if(token && token	!== undefined) {
    client
      .connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        firstName: cookies.get('firstName'),
        lastName: cookies.get('lastName'),
        hashedPassword: cookies.get('hashedPassword'),
      },
        token
      )
      .then((user) => {
        setIsAuth(true)
      });
  }
  
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  }
  
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <CreateGame />
          <button onClick={logOut}> Log Out </button>
        </Chat>
      ) : (
        <>
          <SingUp setIsAuth={setIsAuth}/>
          <LogIn setIsAuth={setIsAuth}/>
        </>
      )}
    </div>
  );
}

export default App;
