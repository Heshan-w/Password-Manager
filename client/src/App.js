import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setWebService] = useState("");

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-500">
      <span className="mt-5">Enter the web service</span>
      <input
        type="text"
        placeholder="Ex. Instagram"
        onChange={(event) => setWebService(event.target.value)}
      />

      <span className="mt-5">Enter the password</span>
      <input
        type="text"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={addPassword} className="m-2 p-2 bg-black cursor-pointer text-white">Add Password</button>
    </div>
  );
}

export default App;
