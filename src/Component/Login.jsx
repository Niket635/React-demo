import React, { useState } from "react";
import "./index.css";

import { useNavigate } from "react-router-dom";
import Http from "../Http (1)";
import { toast } from 'react-toastify';
import Store from "../Store/Store";


const url = (process.env.REACT_APP_API_KEY)
function Login() {

  const navigate = useNavigate();
  const auth = Store((state) => state.auth)
  const tokenFunction = Store((state) => state.tokenFunction)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);

  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlesubmit(e);
    }
  };

  const handlesubmit = (event) => {
    localStorage.setItem("name", "admin");
    event.preventDefault();

    let payload = { email, password };

    Http.callApi('post', url + "login", payload)
      .then((response) => {
        auth(response.data.data);
        tokenFunction(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        Http.setBearerToken(response.data.data.token);
        toast.success(response.data.message);
        // toast("Login Successfull");
        navigate("/admin/dashbord ")

      }).catch((error) => {
        // console.error(error, 'kishan');
        toast.error(error?.response?.data?.message)
      })
  };

  return (
    <>
      <form className="bg-gray-50 dark:bg-gray-900" action="" method="">

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input value={email}
                    onChange={handleEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input value={password}
                    onChange={handlePassword} onKeyPress={handleKeyPress} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                </div>
                <button onClick={handlesubmit}
                  className="inline-block py-2 text-xl text-white bg-red-800 px-7 hover:bg-green-700 rounded-xl">
                  login
                </button>
              </form>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
