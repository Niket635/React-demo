import React, { useState } from 'react'
import { FaFacebook, FaGithub, FaHome, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Http from '../Http (1)';


function Footer() {
    const url = process.env.REACT_APP_API_KEY

    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        Http.callApi('get', url + `categories/count`)
            .then((response) => {
                console.log(response, 454);
                const user = response.data.data.data;
                setCategories(user)
                const user1 = response.data.data;

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className='bg-gray-800 text-white flex justify-center mt-5  '>
                <div className='flex flex-col md:flex-row gap-x-10 mt-20'>
                    <div className='flex'>
                        <div>
                            <img src="https://blog-dev.octalinfotech.com/img/octal_infotech-logo_480.f7cd037c.png" className='w-28 h-16 rounded-xl' alt="" />
                            <div className='h1'>Octal Infotech</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h1 className='font-medium h4 '>Company</h1>
                            <ul className='flex flex-col gap-y-3'>
                                <li>About</li>
                                <li>Meet the Team</li>
                                <li>Accounts Review</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col md:flex-row gap-x-12'>

                            <div className=''>
                                <h1 className='h3'>Connect</h1>
                                <ul className='flex flex-col gap-y-3 mt-4'>
                                    <li className='flex items-center gap-x-2'> <FaFacebook /> Facebook</li>
                                    <li className='flex items-center gap-x-2'> <FaInstagram /> Instagram</li>
                                    <li className='flex items-center gap-x-2'> <FaTwitter /> Twitter</li>
                                    <li className='flex items-center gap-x-2'> <FaGithub /> GitHub</li>
                                    <li className='flex items-center gap-x-2'> <FaLinkedin /> LinkedIn</li>
                                </ul>
                            </div>

                            <div>
                                <h1 className='h3'>Categories</h1>
                                <ul className='flex flex-col gap-y-3 mt-4'>
                                    {
                                        Categories.map((data) => (
                                            <Link to={`/categories/${data.id}`}>

                                                <li >{data.name} ( {data.blog_count} )</li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Footer