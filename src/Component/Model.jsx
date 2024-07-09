import React from 'react';

function Modal({ isVisible, onClose, children }) {
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };

    return (
        <div onClick={handleClose} id="wrapper" className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg overflow-hidden'>
                <div className='flex justify-between items-center bg-gray-800 text-white px-4 py-2'>
                    <h2 className='text-lg font-semibold'></h2>
                    <button onClick={onClose} className='text-xl font-bold focus:outline-none'>&times;</button>
                </div>
                <div className='p-4'>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
