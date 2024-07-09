import { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import Http from '../Http (1)';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Carousel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [Catagories, setCatagories] = useState();
    const url = (process.env.REACT_APP_API_KEY);
    const currentId = useParams().id;
    function myFunction() {
        Http.callApi('get', url + `categories`)
            .then((response) => {
                // setCategory(response.data.data.category);
                console.log(response);
                let User = response.data.data.data
                setCatagories(User)


            })
            .catch((error) => {
                console.log(error);

            });
    }

    useEffect(() => {
        myFunction("")
    }, []);

    return (
        <div className='mt-[8rem]'>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                autoplay={false}
                infinite={true}
                itemsToShow={1}
                itemsToScroll={2}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'black',
                        cursor: 'pointer',
                        fontSize: '30px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                        marginBottom: 50,

                    },
                    children: <span><i class="fa fa-angle-right"></i></span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'black',
                        cursor: 'pointer',
                        fontSize: '30px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                        marginBottom: 50,
                    },
                    children: <span><i class="fa fa-angle-left "  ></i></span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 8,
                        itemsToScroll: 1,
                        minWidth: 768,
                    },
                ]}
                speed={400}
                easing="linear"
            >
                {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                {/* <div style={{ width: 300, height: 300, background: '#ff80ed' }}>
                        slide 0
                    </div> */}

                {
                    Catagories?.map((data) => (
                        <div style={{ width: 200, height: 200 }} >
                            {/* {data.name} */}


                            <div className='flex flex-col items-center'>
                                <div>
                                    <img src={data.image} alt="s" className={`h-20 w-20 rounded-full  border-black p-2  ${data.id == currentId && 'border-2'}`} />
                                </div>
                                <Link to={`/categories/${data.id}`}>
                                    <div className={`pt-4 font-bold  hover:border-b-4 border-black ${data.id == currentId && 'border-b-4 '}`}>
                                        <h1 className='focus:bg-red-900 active'>{data.name}</h1>
                                    </div>

                                </Link>

                            </div>

                        </div>
                    ))
                }

            </ReactSimplyCarousel>
        </div>
    );
};

export default Carousel; 
