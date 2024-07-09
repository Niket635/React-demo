import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';
import Model from '../Component/Model';
import axios from "axios";
import { toast } from 'react-toastify';
import Pagination from '../Component/Pagination';
import Swal from 'sweetalert2';
// import Swal from "sweetalert2";
const url = (process.env.REACT_APP_API_KEY);

function Tags() {

  const [users, setUser] = useState();
  const [userInp, setuserInp] = useState({});
  const [Toggle, setToggle] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [changeAdd_Update, setChangeAdd_Update] = useState(true);

  // const [Category, setCategory] = useState();
  useEffect(() => {

    myFunction(search)

  }, [search])

  const openModal = () => {
    setshowModal(true);
    setChangeAdd_Update(true);
    setToggle(true);
    setuserInp('')
  }

  const handleSerching = (event) => {
    setSearch(event.target.value);
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setuserInp(values => ({ ...values, [name]: value }))
  }

  const HandleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    setuserInp('')

    const formData = new FormData();
    formData.append('name', userInp.name);

    axios.post("https://blog-api-dev.octalinfotech.com/api/tages/store", formData, {
      headers:
        { "Authorization": `Bearer ${token}` }
    })
      // Http.callApi('post', url +'categories/store')
      .then((response) => {
        const user = response.data.data.data;
        setuserInp(user)
        toast.success(response.data.message);
        setshowModal(false);
        myFunction()
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getTags = (id) => {
    setChangeAdd_Update(false)
    Http.callApi('get', url + `tages/${id}/show`)

      .then((response) => {
        const user = response.data.data;
        setuserInp(user)
        setshowModal(true);
        myFunction()
      })
      .catch((error) => {
        console.log(error);
      });
    setToggle(false);
  }


  const Update = (e) => {
    e.preventDefault();
    setChangeAdd_Update(true)


    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append('name', userInp.name);
    Http.callApi('post', url + `tages/${userInp.id}/update`, formData)
      .then((response) => {
        const user = response.data.data.data;
        setUser(user)
        toast.success(response.data.message);
        setshowModal(false);
        myFunction()
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message)
      });
    setToggle(true);
    setuserInp("")

  }


  const Delete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {


        console.log(id);
        setuserInp();
        Http.callApi('delete', url + `tages/${id}/delete`)
          .then((response) => {
            console.log(
              response
            );
            // toast.success(response.data.message);
            Swal.fire({
              title: response.data.message,
              text: "Your file has been deleted.",
              icon: "success"
            });
            myFunction()
          })
      }
    });

  }

  function myFunction(search = "") {
    Http.callApi('get', url + `tages?search=${search}`)
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
              <button className='bg-gray-800 px-2 p-2 text-white rounded-lg hover:bg-gray-950 mx-5 m-2 ' id="main" onClick={openModal}  >+ New Tag</button>
            </div>

            <Model isVisible={showModal} onClose={() => setshowModal(false)} >
              <div className='p-4' >

                <h1 className='h3 text-center p-4 '> {changeAdd_Update === true ? "Add" : "Update"} A Tag</h1>
                <form  >
                  <div>
                    <label htmlFor='Name'>Name:</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter a your name' value={userInp?.name || ""}
                      onChange={handleChange} />
                  </div>
                  <br />
                  <br />
                  <div className='flex gap-x-9  pt-8 justify-end '>

                    <button className='bg-gray-600 px-3 py-2 rounded-lg text-white font-bold' onClick={() => setshowModal(false)} >Cancle</button>
                    {
                      Toggle ? <button onClick={HandleSubmit} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold'  >Add</button>
                        :
                        <button onClick={Update} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold '  >Update</button>
                    }

                  </div>
                </form>
              </div>
            </Model>
          </>
        </div>
      </div>

      <div className="">

        <table className="min-w-full text-center text-sm font-light">
          <thead className="border font-medium ">
            <tr>
              <th scope="col" className=" py-2 text-sm">Id</th>

              <th scope="col" className=" py-2 text-sm">Name</th>
              <th scope="col" className=" text-sm">Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-black/10'>
            {users?.data.map((data, index) => (
              <tr className="">
                <td className="whitespace-nowrap px-6 py-3 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-3">{data.name}</td>
                <td><i onClick={() => getTags(data.id)} className="fa-regular fa-pen-to-square mt-3  text-green-700 whitespace-nowrap py-3" role="button"></i>
                  <i onClick={() => Delete(data.id)} className="fa-solid fa-trash text-red-700 whitespace-nowrap px-6" role="button"></i></td>
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

export default Tags;