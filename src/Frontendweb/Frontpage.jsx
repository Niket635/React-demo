import Carousel from "./Carousel"
import React, { useState } from 'react'
import Fblog from "./Fblog";
import Fcarosusel from "./Fcarousel";
import Footer from "./Footer";
import FrontNav from "./FrontNav";
function Frontpage() {
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);

    }
    return (
        <>

            <section>
                <FrontNav handleSearch={handleSearch} />
                <Carousel />
                <Fblog search={search}/>
                <Fcarosusel />
                <Footer />
            </section>
        </>
    )
}

export default Frontpage
