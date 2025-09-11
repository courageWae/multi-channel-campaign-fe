import React from 'react';

const StatisticsCards = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Revenue Status</h3>
                <p className="text-green-500">$432</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Page View</h3>
                <p className="text-green-500">$432</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Bounce Rate</h3>
                <p className="text-red-500">$432</p>
            </div>
        </div>
    );
};

export default StatisticsCards;


// import React from 'react';

// const StatisticsCards = () => {
//     return (
//         <div className="grid grid-cols-3 gap-4">
//             <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-lg font-bold">Revenue Status</h3>
//                 <p className="text-green-500">$432</p>
//             </div>
//             <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-lg font-bold">Page View</h3>
//                 <p className="text-green-500">$432</p>
//             </div>
//             <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-lg font-bold">Bounce Rate</h3>
//                 <p className="text-red-500">$432</p>
//             </div>
//         </div>
//     );
// };

// export default StatisticsCards;
