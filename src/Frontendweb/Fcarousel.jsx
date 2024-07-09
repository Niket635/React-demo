import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

function Fcarosusel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    return (
        <div className='mt-5'>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                autoplay={false}
                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`<`}</span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                        minWidth: 10,
                    },
                ]}
                speed={400}
                easing="linear"
            >

                <div className='h-[200px] md:h-[350px]  md:w[700px]  lg:h-[450px] w-[1000px]'>
                    <img className='w-[50%] md:w-[100%] object-cover' src="https://marketplace-cdn.atlassian.com/files/422562e8-0358-462a-8dca-301eeb611c93?fileType=image&mode=full-fit" alt="" />
                </div>
                <div className='h-[200px] md:h-[350px]  md:w[700px] lg:h-[450px] w-[1000px]'>
                    <img className='w-[50%] md:w-[100%] object-cover' src="https://t3.ftcdn.net/jpg/02/16/03/28/360_F_216032849_rE3hjVYDhZMeO5OxE9bWsH7jYSucG3Ky.jpg" alt="" />
                </div>
                <div className='h-[200px] md:h-[350px]  md:w[700px] lg:h-[450px] w-[1000px]'>
                    <img className='w-[50%] md:w-[100%] object-cover' src="https://e1.pxfuel.com/desktop-wallpaper/125/969/desktop-wallpaper-web-development-posted-by-sarah-anderson-full-stack.jpg" alt="" />
                </div>
                <div className='h-[200px] md:h-[350px] md:w[700px] lg:h-[450px] w-[1000px]'>
                    <img className='w-[50%] md:w-[100%] object-cover' src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/336072064/original/6428f500c92850befd71d58abf50780bff0bc89f/develop-html-css-javascript-web-pages-for-front-end.jpg" alt="" />
                </div>
                <div className='h-[200px] md:h-[350px] md:w[700px] lg:h-[450px] w-[1000px]'>
                    <img className='w-[50%] md:w-[100%] object-cover' src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png" alt="" />
                </div>
             
            </ReactSimplyCarousel>
        </div >
    );
}

export default Fcarosusel;