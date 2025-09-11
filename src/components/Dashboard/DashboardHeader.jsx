import React from 'react';

const DashboardHeader = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">$3468.96</h2>
                    <p className="text-gray-500">Overview of Last Month</p>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Last Month Summary</button>
            </div>
            {/* Add graph here */}
        </div>
    );
};

export default DashboardHeader;
