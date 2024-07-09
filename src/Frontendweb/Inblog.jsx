import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import Footer from './Footer';
import { FaArrowLeft, FaCalendar, FaFacebookF, FaTwitter, FaUser } from 'react-icons/fa';
import FrontNav from './FrontNav';

function Inblog() {

    const [BlogsShow, setBlogsShow] = useState({});
    const [leastedBlog, setleastedBlog] = useState([]);

    const navigate = useNavigate()
    let { id } = useParams();
    const n = 1000;
    
    const Blogs = (id) => {
        const token = '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'
        axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/show`,
            { headers: { "Authorization": `Bearer ${token}` } })

            .then((response) => {
                const user = response.data.data;
                const user1 = response.data.data.latestPost;
                setBlogsShow(user)
                setleastedBlog(user1)


            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        Blogs(id)
    }, [id]);

    let html = BlogsShow.description;
    let div = document.createElement("div");
    div.innerHTML = html;
    let text = div.textContent || div.innerText || "";


    const BacktheHomePage = () => {
        navigate('/')
    }


    return (
        <>
            <FrontNav />
            <div>

                <br /><br /><br />
                <div >
                    <div className='flex w-full   p-2 border-b-2 border-gray-300 rounded-md container ' >

                        <div className='container mx-52'>

                            <div className='float-right mt-4'  >
                                <button className='bg-black p-2  text-white ' onClick={BacktheHomePage}><p className='flex items-center   gap-x-2'><FaArrowLeft /> Back </p></button>
                            </div>

                            <div>
                                <div className='h1 mt-7'> {BlogsShow.category_name}</div>

                                <div className='mt-7'>
                                    <div className='flex items-center gap-x-3'>
                                        <p>By</p>
                                        <div> <img src={BlogsShow.image} className='h-10 w-10 rounded-full' alt="" /></div>
                                        <div > {BlogsShow.user_name}</div>
                                        <p>on</p>
                                        <div className='text-gray-500'>{BlogsShow.date}</div>
                                    </div>
                                </div>

                                <div className='flex gap-x-3 mt-10 mb-7'>
                                    <div>
                                        <button className=' gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#3059b0] '> <FaFacebookF /> SHARE</button>
                                    </div>

                                    <div>
                                        <button className=' gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#55acef] '> <FaTwitter /> SHARE</button>
                                    </div>
                                </div>

                                <hr />

                                <div className='flex mt-7 gap-x-5    '>
                                    <div className=' text-justify col-6 '  >
                                        {text}
                                    </div>
                                    <div className='col-6 '>
                                        <img src={BlogsShow.image} className=' rounded w-[500px] h-[500px]] object-contain  ' alt="" />
                                    </div>
                                </div>

                                <div className='flex items-center mt-10 gap-x-4'>
                                    <div>
                                        <img src={BlogsShow.user_image} className='h-24 w-24 rounded-full' alt="" />
                                    </div>

                                    <div>
                                        <p className='font-semibold text-[25px]'>{BlogsShow.user_name}</p>
                                        <p>{BlogsShow.slug}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='  my-10'>

                        <div className='flex flex-wrap   justify-center container  gap-y-14 gap-x-12'>
                            {
                                leastedBlog?.map((data, index) => (
                                    <div className='cursor-pointer shadow-md  shadow-gray-500 '>
                                        <Link to={`/Inblog/${data.id}`}>
                                            <div className=''>
                                                <img src={data.image} className='  w-[330px] h-[220px] object-contain ' alt="alert" />
                                            </div>



                                            <div className='flex items-center gap-x-3 gap-y-14 mt-2 justify-between mx-2 '>
                                                <div className='flex items-center gap-x-2'>
                                                    <div>{/*<img src={data.user_image} alt="" className='h-5 w-5 rounded-full' />*/} <FaUser /> </div>
                                                    <div>{data.user_name}</div>
                                                </div>
                                                <div className='flex items-center gap-x-2'>
                                                    <div> <FaCalendar /> </div>
                                                    <div> {data.date}</div>
                                                </div>
                                            </div>
                                            <div className='mt-2 py-4'>

                                                <h1 className='h5 text-center'>{data.title}</h1>
                                            </div>
                                        </Link>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default Inblog
