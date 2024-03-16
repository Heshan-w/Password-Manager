import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setWebService] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    });
  };

  const getpassword = (encryption) => {
    Axios.post("http://localhost:3001/getpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((value, index) => {
          return value.id == encryption.id
            ? {
                id: value.id,
                password: value.password,
                title: response.data,
                iv: value.iv,
              }
            : value;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/showpassword").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  return (
    <>
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
        <button
          onClick={addPassword}
          className="m-2 p-2 bg-black cursor-pointer text-white"
        >
          Add Password
        </button>
      </div>

      <div className="flex flex-col justify-center items-center h-screen bg-white">
        {passwordList.map((value, index) => {
          return (
            <div key={index}>
              <h1
                className="text-2xl m-3 p-3 
                border-2 w-96
                text-center bg-slate-700
                text-white cursor-pointer"
                onClick={() => {
                  getpassword({
                    password: value.password,
                    iv: value.iv,
                    id: value.id,
                  });
                }}
              >
                {value.title}
              </h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
