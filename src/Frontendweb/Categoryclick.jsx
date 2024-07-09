import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer';
import { FaCalendar, FaUser } from 'react-icons/fa';
import FrontNav from './FrontNav';
import Carousel from "./Carousel"

function CategoriesShow() {

    const [Categories, setCategories] = useState([]);
    const [total, settotal] = useState();

    let { id } = useParams();

    function ReturnApiCall(id) {
        const token = '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'
        axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${id}/blogs`,
            { headers: { "Authorization": `Bearer ${token}` } })

            .then((response) => {
                const user = response.data.data.data;
                const user1 = response.data.data.total;
                settotal(user1);
                setCategories(user)

            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        ReturnApiCall(id)
    }, [id]);

    return (
        <>

            <FrontNav />

            <div>
                < Carousel />
            </div>

            <div className='flex gap-x-10 justify-center items-center mb-56' >
                {
                    total == 0 ?

                        <div className='text-black h1'>Blog data not found</div>

                        :
                        Categories.map((data) => (

                            <div className='cursor-pointer bg-slate-50 shadow-md  shadow-gray-400 '>
                                <Link to={`/Inblog/${data.id}`}>
                                    <div>
                                        <img src={data.image} className='  w-[350px] h-[230px] object-contain items-center flex justify-center' alt="alert" />

                                    </div>

                                    <div className='flex items-center gap-x-3 gap-y-14 mt-2 justify-between mx-2 '>
                                        <div className='flex items-center gap-x-2'>
                                            <div> <FaUser /> </div>
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
            <Footer />
        </>

    )
}

export default CategoriesShow
