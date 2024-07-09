import React from 'react'

export default function Table(props) {
    return (
        < >
            <table className="table-fixed w-[500px]">
                <thead className='w-full text-center gap-y-20 text-sm font-light '>
                    <tr className='border-b font-medium'>
                        {props.thead}
                    </tr>
                </thead>
                <tbody>
                    {props.tbody}
                </tbody>
            </table >
        </>
    )
}
