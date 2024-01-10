import React from 'react'


const Modal = function ({ isOpen , onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center ">
        <div className="absolute bg-black opacity-80 inset-0" onClick={onClose}></div>
        <div className="bg-white rounded-xl p-4 z-10 ">{children}</div>
        </div>
    );
};

export default Modal;