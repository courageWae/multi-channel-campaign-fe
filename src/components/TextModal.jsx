import React from 'react';

const TextModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="p-6">
          <div className="text-left">
            <p>Dear John,</p>
            <p className="mt-2">I Hope everything is going good</p>
            <p className="mt-4">Regards,</p>
            <p>Pallav Nawani</p>
          </div>
          <div className="mt-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Send test SMS to a contact
            </label>
            <p className="text-xs text-gray-500">Ensure your recipient is registered in your contact list with a valid mobile phone number in the SMS field.</p>
            <div className="mt-1 flex">
              <select className="block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>+91</option>
              </select>
              <input
                type="text"
                name="phone"
                id="phone"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ml-2"
                placeholder="Phone number"
              />
              <button
                type="button"
                className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
              >
                Send test
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
