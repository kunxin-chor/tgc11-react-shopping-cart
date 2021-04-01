import React, { useState } from "react";
import axios from 'axios'

const BASE_URL = "https://3000-jade-minnow-44faco8x.ws-us03.gitpod.io";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <label>Email:</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={ async ()=>{
        const response = await axios.post(BASE_URL + "/api/users/login", {
            'email': email,
            'password': password
        });
        // store the tokens in local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }}>Log in</button>
    </div>
  );
}

export default App;
