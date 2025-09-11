import React from "react";
import { FaDotCircle, FaRegCheckCircle } from "react-icons/fa";

function CaseModal({ isOpen, onClose, title, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl relative max-h-[98vh] overflow-y-auto ">
        {/* Header */}
        <div className="sticky top-0">
          <div className="flex justify-between items-center bg-white z-10 p-6">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 rounded-md bg-orange-100 flex justify-center items-center text-orange-500 text-3xl">
                {data.icon ? data.icon : <FaDotCircle />}
              </div>
              <div>
                <h2 className="text-2xl text-orange-500 font-semibold">
                  {title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{data.topHeading}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-semibold"
            >
              &times;
            </button>
          </div>
          {/* Divider */}
          <div className="h-1 bg-orange-500 mb-4 sticky top-24 "></div>
        </div>

        <div className="px-6 py-3">
          <div className="rounded-md p-4 bg-orange-100 mb-4">
            <h4 className="text-orange-500 text-lg font-semibold">Scenario:</h4>
            <p className="text-gray-700 text-sm mt-2">{data.scenario}</p>
          </div>
        </div>

        {/* Implementations and Benefits */}
        <div className="flex flex-wrap gap-4 p-6">
          {/* Implementations */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.implementations.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <FaDotCircle className="text-orange-500 mr-2" />
                  <p className="text-orange-500 font-semibold">{item.title}</p>
                </div>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="w-full md:w-2/5">
            <h4 className="text-orange-500 font-semibold mb-2">Benefits:</h4>
            {data.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start mb-2">
                <div className="flex items-center text-md">
                  <FaRegCheckCircle className="text-orange-500 mt-1" />
                </div>
                <p className="text-gray-700 text-sm ml-2">{benefit.item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex justify-end p-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseModal;
