import React from 'react'
import { Link } from "react-router-dom";


function FrontNav({ handleSearch }) {


    return (
        <>
            <div className="flex   flex-col">

                <div className="bg-black p-4 shadow-xl  bg-white border-b border-gray-200 z-50 w-full fixed overflow-hidden">
                    {/* <div className="flex items-center mx-36 justify-evenly"> */}
                    {/* <p></p> */}
                    <div className="md:flex md:flex-row flex-col md:items-center md:justify-evenly justify-center">
                        <div className="flex items-center pr-4" >
                            {/* absolute left-52 text-xxl */}
                            <div className="md:block hidden">
                                <img src="	https://blog-dev.octalinfotech.com/img/octal_infotech-logo_480.f7cd037c.png" alt="" className='w-44' />
                            </div>

                        </div>
                        <div className="md:block">
                            <nav className="">

                                <Link to="/" >
                                    <span className="mx-3">Home</span>
                                </Link>
                                <Link to="/" >
                                    <span className="mx-3">Blogs</span>
                                </Link>

                                <Link to="/contact">
                                    <span className="mx-3" >Contact us</span>
                                </Link>

                            </nav>

                        </div>
                        <form >

                            <div className=" flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-100 overflow-hidden">
                                <div className="grid place-items-center h-full w-12">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input
                                    className="peer h-full w-full outline-none text-sm bg-slate-100 text-gray-700 bg-s pr-2 border-none" type="text"
                                    placeholder="Search something.." onChange={handleSearch} />
                            </div>

                        </form>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default FrontNav
