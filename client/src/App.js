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
    }).then(() => {
      // After adding password, fetch updated password list
      fetchPasswordList();
    });
  };

  const fetchPasswordList = () => {
    Axios.get("http://localhost:3001/showpassword").then((response) => {
      setPasswordList(response.data);
    });
  };

  const getPassword = (encryption) => {
    Axios.post("http://localhost:3001/getpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList((prevList) =>
        prevList.map((value) =>
          value.id === encryption.id
            ? { ...value, title: response.data }
            : value
        )
      );
    });
  };

  useEffect(() => {
    fetchPasswordList();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-col justify-center items-center">
        <span className="mt-5">Enter the web service</span>
        <input
          type="text"
          placeholder="Ex. Instagram"
          onChange={(event) => setWebService(event.target.value)}
          className="bg-gray-800 text-white mt-2 p-2 rounded w-[300px]"
        />
        <span className="mt-5">Enter the password</span>
        <input
          type="text"
          onChange={(event) => setPassword(event.target.value)}
          className="bg-gray-800 text-white mt-2 p-2 rounded w-[300px]"
        />
        <button
          onClick={addPassword}
          className="m-2 p-2 bg-blue-500 cursor-pointer text-white rounded"
        >
          Add Password
        </button>
      </div>

      <div className="flex flex-col justify-center items-center overflow-y-auto">
        {passwordList.map((value, index) => (
          <div key={index}>
            <h1
              className="text-2xl m-3 p-3 border-2 w-96 text-center cursor-pointer bg-gray-800 rounded-lg"
              onClick={() => {
                getPassword({
                  password: value.password,
                  iv: value.iv,
                  id: value.id,
                });
              }}
            >
              {value.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
