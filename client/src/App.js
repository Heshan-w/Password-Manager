import React, { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [webService, setWebService] = useState("");

  const handleclick = () => {
    
  }

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

      <button onClick={handleclick}>
        Add Password 
      </button>
    </div>
  );
}

export default App;
