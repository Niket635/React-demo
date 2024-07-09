import React from 'react';
import Http from '../Http (1)';

function Pagination({ links, setUser }) {

    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }

    const handleClickLink = (link) => {
        Http.callApi('get', link?.url)
            .then((response) => {
                // setCategory(response.data.data.category);
                // console.log(response.data.data, 'blog data is here');
                let users = response.data.data;
                setUser(users)

            })
            .catch((error) => {
                console.log(error);

            });
    }



    return (
        links?.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                        link.url === null ?
                            (<div
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                            >{link.label}</div>) :

                            (<a href='#'
                                onClick={() => handleClickLink(link)}
                                className={getClassName(link.active)}
                                to={link.url}
                            >{link.label}</a>)
                    ))}
                </div>
            </div>
        )
    );
}

export default Pagination;
