import React, { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom";
import Http from "../Http (1)";
// import Route from "../Route/routes";
// import { Route } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
  const location = useLocation();
  const name = localStorage.getItem("name");
  const [openprofile, setprofile] = useState(false)
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const navigat = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigat("/login")
  //   }
  // }, [])

  // let token = localStorage.getItem("token")
  // useEffect(() => {
  //   Http.setBearerToken(token)
  // },[])

  const handleSidebar = () => {
    setIsOpenSidebar((isOpenSidebar) => !isOpenSidebar)
  }

  function setLogout() {
    localStorage.removeItem("token")
    navigat("/login")
  }

  return (
    <>
      <div className="flex h-screen w-full  gap-3">
        <div className={`${isOpenSidebar ? 'flex' : 'hidden'} md:flex flex-col w-64  h-screen top-14`}>
          <div className="flex flex-col flex-1 overflow-hidden relative">
            <nav className="flex-1 px-2 py-4 shadow-xl bg-gray-800  absolute h-screen w-full top-12">

              <Link to="/admin/dashbord" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-500"><i className="fa-solid fa-house "></i>
                <span className="mx-2">Dashbord</span>
              </Link>
              <Link to="/admin/categories" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-500"><i className="fa-solid fa-list"></i>
                <span className="mx-2">Categories</span>
              </Link>

              <Link to="/admin/users" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-500"><i class="fa-solid fa-users"></i>
                <span className="mx-2">Users</span>
              </Link>
              <Link to="/admin/tags" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-500"><i className="fa-solid fa-tags"></i>
                <span className="mx-2">Tags</span>
              </Link>
              <Link to="/admin/blogs" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-500"><i class="fa-solid fa-box"></i>
                <span className="mx-2">Blogs</span>
              </Link>
              <Link to="/admin/contacts" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-500"><i class="fa-solid fa-address-book"></i>
                <span className="mx-2">Contacts</span>
              </Link>

            </nav>
          </div>
        </div>
        x
        <div className="flex justify-between px-3  bg-black items-center h-16 shadow-xl   bg-white border-b border-gray-200 fixed w-full">
          <div className="flex items-center gap-20 px-3">
            <div className="hidden md:flex items-center gap-3">
              <img src="http://octalinfotech.com/img/octal-logo.png" className="h-10 rounded-full" alt="" />
              <span className="  font-bold uppercase w-full"><h2>Octal Infotech</h2></span>
            </div>
            <div className="block md:hidden">
              <button onClick={handleSidebar} className="text-xl  p-3 rounded-md"><i class="fa-solid fa-bars"></i></button>
            </div>
            <div className="flex items-center  pr-4 " >
              <div className="text-xxl">
                <span className="underline uppercase" ><b className="">{location.pathname.slice(7)}</b></span>
              </div>
            </div>
          </div>

          <div className=" items-center ">

            <Dropdown>
              <Dropdown.Toggle style={{ border: "none" }} className="bg-transparent  z-50  rounded-full">
                <button
                  className=" items-center">
                  <img src="https://ims-api.octalinfotech.com/images/avatar.png" className="h-9 rounded-full border-none" alt="yh" />

                </button>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="# " onClick={setLogout} > <b>Logout</b></Dropdown.Item>
                <Dropdown.Item href="# "> <b>Profile</b>  </Dropdown.Item>
                <Dropdown.Item href="#"> <b>Change Password</b></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto ">
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar