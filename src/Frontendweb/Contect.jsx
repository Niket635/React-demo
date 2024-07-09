import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import axios from 'axios';
import FrontNav from './FrontNav';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Contect() {

    const [userInp, setuserInp] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        setuserInp(values => ({ ...values, [name]: value }));
        console.error(userInp);
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        const token = '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'
        axios.post(`https://blog-api-dev.octalinfotech.com/api/contact-us`, userInp,
            { headers: { "Authorization": `Bearer ${token}` } })

            .then((response) => {
                const user = response.data.data.data;
                console.log("user d", user);
                toast.success(response.data.message);

            })

            .catch((error) => {
                console.log(error);
            });

        navigate('/')

    }

    return (
        <>
            <FrontNav />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white mt-5">Contact Us</h2>

                    <form action="#" className="space-y-8" onSubmit={handlesubmit}>
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                            <input type="text" name='name' className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" onChange={handleChange} placeholder="Enter Your Name" value={userInp?.name} required />
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input type="email" name='email' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" onChange={handleChange} placeholder="Enter Your Email" value={userInp?.email} required />
                        </div>

                        <div className="sm:col-span-2">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea rows="6" name='message' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Leave a comment..." value={userInp?.message}></textarea>
                        </div>
                        <button style={{ background: 'blue' }} className="bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded" type='submit'>Submit
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Contect

