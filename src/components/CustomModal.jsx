import React from 'react';
import tw from 'tailwind-styled-components';

const CustomModal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
