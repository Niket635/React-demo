import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';
import Model from '../Component/Model';
import axios from "axios";
import { toast } from 'react-toastify';
import Pagination from '../Component/Pagination';
import DropdownComponent from '../Component/Drpdwn';
import Swal from 'sweetalert2';
const url = (process.env.REACT_APP_API_KEY);

function Blogs() {

  const [users, setUser] = useState();
  const [userInp, setuserInp] = useState({});
  const [Toggle, setToggle] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [UserApi, setUserApi] = useState([]);
  const [categoriesApi, setcategoriesApi] = useState([]);
  const [search, setSearch] = useState("");
  const [StatusSearchFilter, setStatusSearchFilter] = useState('');
  const [usersfilter, setusersfilter] = useState('');
  const [catagoriesfilter, setcatagoriesfilter] = useState('');
  const [changeAdd_Update, setChangeAdd_Update] = useState(true);

  const statusData = [
    { name: 'All', value: 0 },
    { name: 'Publish', value: 1 },
    { name: 'Unpublish', value: 2 },

  ]

  const [selectedOption, setSelectedOption] = useState(statusData[0]);
  const [selectedUser, setSelectedUser] = useState({
    name: 'All',
    value: ''
  });
  const [selectedCategori, setSelectedCategori] = useState({
    name: 'All',
    value: ''
  });

  const handleSerching = (event) => {
    setSearch(event.target.value);
  }


  const openModal = () => {
    setshowModal(true);
    setChangeAdd_Update(true);
    setToggle(true);
    setuserInp('')
  }

  useEffect(() => {
    Http.callApi('get', url + `users/all`)
      .then((response) => {
        let user = response.data.data;
        user = user.map((item) => {
          return {
            name: item.name,
            value: item.id,
            id: item.id
          }
        });
        user.unshift({
          name: 'All',
          value: ''
        });
        setUserApi(user)
        myFunction();

      })
      .catch((error) => {
        console.log(error);
      });


    setToggle(false);
  }, []);


  useEffect(() => {
    Http.callApi('get', url + `categories/all`)
      .then((response) => {
        let categories = response.data.data;
        categories = categories.map((item) => {
          return {
            name: item.name,
            value: item.id,
            id: item.id
          }
        });
        categories.unshift({
          name: 'All',
          value: ''
        });
        setcategoriesApi(categories)
        myFunction()

      })
      .catch((error) => {
        console.log(error);
      });


    setToggle(true);
  }, [])


  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    console.warn(event);
    setuserInp(values => ({ ...values, [name]: value }))
  }

  console.log();


  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const HandleSubmit = (event) => {
    event.preventDefault();
    // const token = Store((state) => state.token)
    let token = localStorage.getItem("token");


    setuserInp('')

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('user_id', userInp.user_id);
    formData.append('title', userInp.title);
    formData.append('description', userInp.description);
    formData.append('category_id', userInp.category_id);
    formData.append('date', userInp.date);
    formData.append('status', userInp.status);

    axios.post("https://blog-api-dev.octalinfotech.com/api/blogs/store", formData, {
      headers:
        { "Authorization": `Bearer ${token}` }
    })
      // Http.callApi('post', url +'categories/store')
      .then((response) => {

        const user = response.data.data.data;
        console.log(user);
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

  const getCategories = (id) => {
    setChangeAdd_Update(false)

    Http.callApi('get', url + `blogs/${id}/show`)
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
    formData.append('image', selectedFile);
    formData.append('user_id', userInp.user_id);
    formData.append('title', userInp.title);
    formData.append('description', userInp.description);
    formData.append('category_id', userInp.category_id);
    formData.append('date', userInp.date);
    formData.append('status', userInp.status);
    Http.callApi('post', url + `blogs/${userInp.id}/update`, formData)
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
        Http.callApi('delete', url + `blogs/${id}/delete`)
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




  function myFunction(search = "", StatusSearchFilter = '', usersfilter = '', catagoriesfilter = '') {
    Http.callApi('get', url + `blogs?search=${search}&status=${StatusSearchFilter}&user_id=${usersfilter}&category_id=${catagoriesfilter}`)
      .then((response) => {
        let users = response.data.data
        setUser(users)
        console.log(users);
      })

      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {

    myFunction(search, StatusSearchFilter, usersfilter, catagoriesfilter,)

  }, [search, StatusSearchFilter, usersfilter, catagoriesfilter,])

  const statusFilter = (option) => {
    setStatusSearchFilter(option.value)
  }

  const userFilter = (user) => {
    setusersfilter(user.value)
  }

  const catagoriesFilter = (categories) => {
    setcatagoriesfilter(categories.value)
  }

  return (
    <div className='shadow-xl bg-white rounded-sm '>
      <div className=' my-5 p-2'>

        <div>
          <>

            <div className='flex  justify-between items-center'>

              <div>
                <div className=" flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-100 overflow-hidden">
                  <div className="grid place-items-center h-full w-12">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <input onChange={handleSerching}
                    className="peer h-full w-full outline-none text-sm bg-slate-100 text-gray-700 bg-s pr-2 border-none" type="text"
                    placeholder="Search Title.." />
                </div>
              </div>

              <div className='flex gap-3 mt-2 mb-4 '>
                <DropdownComponent
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  options={statusData}
                  statusFilter={statusFilter}

                />
                <div>

                  <DropdownComponent
                    selectedOption={selectedUser}
                    setSelectedOption={setSelectedUser}
                    options={UserApi}
                    statusFilter={userFilter}

                  />
                </div>

                <div>
                  <DropdownComponent
                    selectedOption={selectedCategori}
                    setSelectedOption={setSelectedCategori}
                    options={categoriesApi}
                    statusFilter={catagoriesFilter}

                  />

                </div>


                <button className='bg-gray-800 px-2 text-white rounded-lg  mx-5 ' id="main" onClick={openModal}  >+ New Blog</button>
              </div>
            </div>

            <Model isVisible={showModal} onClose={() => setshowModal(false)} >
              <div className='p-4' >

                <h1 className='h3 text-center p-4 '> {changeAdd_Update === true ? "Add" : "Update"} A Blog</h1>


                <form  >
                  <div className='flex gap-10 gap-x-24'>
                    <div>
                      <div>
                        <label htmlFor='UserName'>User:</label>
                        <select className="form-control p-2 border-b-blue " name="user_id" onChange={handleChange} value={userInp?.user_id || ""}>
                          {
                            UserApi.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <br />
                      <div>
                        <label htmlFor='Title'>Title:</label>
                        <input type="text" name='title' className='form-control' placeholder='Enter a your title' value={userInp?.title || ""}
                          onChange={handleChange} />
                      </div>
                      <br />

                      <div>
                        <label htmlFor='Date'>Date:</label>
                        <input type="date" name='date' className='form-control' placeholder='Enter a your date' value={userInp?.date || ""}
                          onChange={handleChange} />
                      </div>
                      <br />
                      <div>
                        <label htmlFor='Categoriey'>Category:</label>
                        <select className="form-control p-2" name="category_id" onChange={handleChange} value={userInp?.category_id || ""}>
                          {
                            categoriesApi.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className=''>
                        <label htmlFor='Status'>Status:</label>

                        <select className="form-control p-2" name='status' onChange={handleChange} value={userInp?.status || ""}>

                          <option value={0}></option>
                          <option value={1}>publish</option>
                          <option value={2}>unpblish</option>

                        </select>
                      </div>
                      <br />
                      <div>
                        <label htmlFor='Image'>Image:</label>
                        <input type="file" name='file' className='form-control' placeholder='Enter a your image'
                          onChange={handleFileUpload} />
                      </div>
                      <br />
                      <div>
                        <label htmlFor='description'>Discription:</label>
                        <textarea name="description" id="" cols="10" rows="5" className='form-control' placeholder='Enter a your Discription' value={userInp?.description || ""}
                          onChange={handleChange}></textarea>

                      </div>
                      <br />
                      <div className='flex gap-x-9  pt-8 justify-end '>

                        <button className='bg-gray-600 px-3 py-2 rounded-lg text-white font-bold' onClick={() => setshowModal(false)} >Cancle</button>
                        {
                          Toggle ? <button onClick={HandleSubmit} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold '>Add</button>
                            :
                            <button onClick={Update} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold '>Update</button>
                        }

                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Model>
          </>
        </div>
      </div>


      <div className=" border-black-600 py-3">
        <table className="min-w-full text-center text-sm font-light ">
          <thead className="border font-medium ">
            <tr>
              <th scope="col" className=" py-2 text-sm">Id</th>
              <th scope="col" className=" py-2 text-sm">Image</th>
              <th scope="col" className=" py-2 text-sm">User</th>
              <th scope="col" className=" py-2 text-sm">Title</th>
              <th scope="col" className=" py-2 text-sm">Category</th>
              <th scope="col" className=" py-2 text-sm">Date</th>
              <th scope="col" className=" py-2 text-sm">Status</th>
              <th scope="col" className="py-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-black/10'>
            {users?.data?.map((data, index) => (
              <tr className=" ">
                <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-2 flex justify-center"><img src={data.image} className='w-[30px] h-[30px] rounded-full object-cover' alt="" /></td>
                <td className="whitespace-nowrap px-6 py-2">{data.user_name}</td>
                <td className="whitespace-nowrap px-6 py-2">{data.title}</td>
                <td className="whitespace-nowrap px-6 py-2">{data.category_name}</td>
                <td className="whitespace-nowrap px-6 py-2">{data.date}</td>
                <td className="whitespace-nowrap px-6 py-2"><span className={data.status === 1 ? "bg-green-700 p-1 rounded-pill text-white px-3" : "bg-red-700 p-1 rounded-pill text-white px-2"}>{data.status === 1 ? "Publish" : "Unpublish"}</span></td>
                <div className='flex gap-4 mt-1  justify-center'>
                  <div >
                    <td>
                      <i onClick={() => getCategories(data.id)} className="fa-solid fa-pen-to-square text-green-700 hover:text-slate-700 text-2xl" role="button"></i>
                    </td>
                  </div>
                  <div className=''>
                    <td>
                      <i onClick={() => Delete(data.id)} className="fa-solid fa-trash text-red-700 text-2xl hover:text-slate-700" role="button"></i>
                    </td>
                  </div>
                </div>
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

export default Blogs;