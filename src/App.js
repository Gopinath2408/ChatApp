import { Auth } from "./components/Auth";
import './App.css';
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const cookies = new Cookies();

function App() {
  const [isAuth, setisAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setRoom(null);
    setisAuth(false);
  };

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <h1><Auth setisAuth={setisAuth} /></h1>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room">
            <label>Enter Room Name :</label>
            <input ref={roomInputRef} placeholder="Room name" />
            <button onClick={() => setRoom(roomInputRef.current.value)}>Join</button>
          </div>
        )}
      </div>

      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
