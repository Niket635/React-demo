import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser } from 'react-icons/fa';

function Fblog({ search }) {

    const [Users, setUsers] = useState([]);
    // const [searchValue, setSearchData] = useState(search);

    useEffect(() => {
        getBlogData(search)
    }, [search])


    const getBlogData = (search) => {
        const token = localStorage.getItem('token')
        let url = `https://blog-api-dev.octalinfotech.com/api/blogs`;
        if (search) {
            url += `?search=${search}`;
        }
        axios.get(url,
            { headers: { "Authorization": `Bearer ${token}` } })

            .then((response) => {
                const user = response.data.data.data;
                setUsers(user)

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>

            <div className='flex flex-wrap   justify-center container  gap-y-14 gap-x-12'>
                {
                    Users.map((data, index) => (
                        <div className='cursor-pointer bg-slate-50 shadow-md hover:scale-105 shadow-gray-400'>
                            <Link to={`Inblog/${data.id}`}>
                                <div>
                                    <img src={data.image} className=' w-[350px] h-[240px]  items-center flex justify-center rounded  object-contain  ' alt="alert" />

                                </div>
                                <div className='flex items-center gap-x-3 gap-y-14 mt-3 justify-between mx-2  '>
                                    <div className='flex items-center gap-x-2'>
                                        <div> <FaUser /> </div>
                                        <div>{data.user_name}</div>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <div> <FaCalendar /> </div>
                                        <div> {data.date}</div>
                                    </div>
                                </div>
                                <div className='mt-2 py-1'>
                                    <h1 className='h5 text-center'>{data.title}</h1>
                                </div>
                            </Link>

                            {/* <div>{data.description}</div> */}


                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Fblog
