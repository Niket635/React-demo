import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';

import Pagination from '../Component/Pagination';
// import Swal from "sweetalert2";
const url = (process.env.REACT_APP_API_KEY);

function Contacts() {

    const [users, setUser] = useState();

    const [search, setSearch] = useState("");
    // const [Category, setCategory] = useState();
    useEffect(() => {

        myFunction(search)

    }, [search])



    const handleSerching = (event) => {
        setSearch(event.target.value);
    }



    function myFunction(search = "") {
        Http.callApi('get', url + `contact-us/index?search=${search}`)
            .then((response) => {
                // setCategory(response.data.data.category);
                console.log(response);
                let users = response.data.data
                setUser(users)
                console.log(users);

            })
            .catch((error) => {
                console.log(error);

            });

    }

    return (
        <div className='shadow-xl bg-white rounded-sm '>
            <div className=' my-5 p-2'>
                <div>
                    <>
                        <div className='flex justify-between gap-3 mt-2 mb-4'>
                            <form>
                                <div className=" flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-100 overflow-hidden">
                                    <div className="grid place-items-center h-full w-12">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <input onChange={handleSerching}
                                        className="peer h-full w-full outline-none text-sm bg-slate-100 text-gray-700 bg-s pr-2 border-none" type="text"
                                        placeholder="Search Name.." />
                                </div>
                            </form>

                        </div>

                    </>
                </div>
            </div>

            <div className="">

                <table className="min-w-full text-center text-sm font-light">
                    <thead className="border font-medium ">
                        <tr>
                            <th scope="col" className=" py-2 text-sm">Name</th>

                            <th scope="col" className=" py-2 text-sm">Email</th>
                            <th scope="col" className=" text-sm">Message</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-black/10'>
                        {users?.data.map((data, index) => (
                            <tr className="">

                                <td className="whitespace-nowrap px-6 py-3">{data.name}</td>
                                <td className="whitespace-nowrap px-6 py-3">{data.email}</td>
                                <td className="whitespace-nowrap px-6 py-3">{data.message}</td>

                            </tr>
                        )
                        )}
                        <tr>
                            <td className='text-end' colSpan={7}>
                                <Pagination class="mt-6" links={users?.links} setUser={setUser} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Contacts;
