import React from "react";
import { Routes, Route } from "react-router-dom"
// import Navbar from "../Component/Navbar";
import Categories from "../pages/Categories";
import Blogs from "../pages/Blogs";
import Users from "../pages/Users";
import Login from "../Component/Login";
import Dashbord from "../pages/Dashbord";
import Tags from "../pages/Tags";
import Contect from "../Frontendweb/Contect";
import CategoriesShow from "../Frontendweb/Categoryclick";
import Contactus from "../pages/Contactus";
import FrontNav from "../Frontendweb/FrontNav";
// import Frontpage from "../Frontendweb/Frontpage";


const routes = [

  {
    path: "/login",
    component: <Login />,
  },
  // {
  //   path: "/", 
  //   component: <Navbar />,
  // },
  // {
  //   path: "/"
  //   component: <Frontpage />
  // },


  {
    path: "/admin/dashbord",
    component: <Dashbord />,
  },
  {
    path: "/admin/categories",
    component: <Categories />,
  },
  {
    path: "/admin/blogs",
    component: <Blogs />,
  },
  {
    path: "/admin/users",
    component: <Users />,
  },
  {
    path: "/admin/tags",
    component: <Tags />,
  },
  {
    path: "/admin/contacts",
    component: <Contactus />,
  },
  {
    path: "/contact",
    component: <Contect />,
  },
  {
    path: "/Categorie",
    component: <CategoriesShow />,
  },
  // {
  //   path: "/home",
  //   component: <FrontNav />,
  // },

]

export default routes;
