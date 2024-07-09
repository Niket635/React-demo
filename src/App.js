
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
// import Dashboard from "./Component/Dashboard";
// import { Route } from "react-router-dom";
import Route from "./Route/index";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Http from "./Http (1)";
import { ClipLoader } from "react-spinners";
// import Store from "../src/Store/Store";


function App() {
  // const token = Store((state) => state.token)
  let token = localStorage.getItem("token")
  useEffect(() => {
    Http.setBearerToken(token)
  }, [])

  // const [loading, setLoding] = useState(true)
  // useEffect(() => {
  //   setLoding(true)
  //   setTimeout(() => {
  //     setLoding(false)
  //   }, 5000)
  // }, [])
  return (
    < >
      <div>
        {/* {
          loading ?
            <ClipLoader 
              color={'D0021B'}
              loading={loading}

              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"


            />
            : */}
            <div className="">
              <BrowserRouter>
                {/* <Dashboard /> */}
                <Route />
              </BrowserRouter>
              <ToastContainer />
            </div>
        
      </div>
     

    </>
  );
}

export default App;
