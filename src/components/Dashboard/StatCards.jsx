

// import React from 'react';
// import tw from 'tailwind-styled-components';

// const CardContainer = tw.div`bg-white shadow-md p-4 m-2 rounded-md w-full md:w-1/4`;
// const Title = tw.h4`text-sm font-medium text-gray-600`;
// const Value = tw.h3`text-3xl font-bold text-gray-800 mt-2 text-center`;
// const SubTitle = tw.p`text-xs text-gray-500`;

// const StatCards = ({ title, value, icon: Icon, iconcolor, color }) => {
//     const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
//     const todayRange = `${today} - ${today}`;

//     return (
//         <CardContainer style={{ backgroundColor: color }}>
//             <div className='flex justify-between'>
//                 <div>
//                     <Title>{title}</Title>
//                     <div className="text-5xl mt-2" style={{ color: iconcolor }}>
//                         <Icon />
//                     </div>
//                 </div>
//                 <div className='mt-5'>
//                     <Value style={{ color: iconcolor }}>{value}</Value>
//                     <SubTitle>{todayRange}</SubTitle>
//                 </div>
//             </div>
//         </CardContainer>
//     );
// };

// export default StatCards;


// src/components/StatCard.jsx
import React from 'react';
import tw from 'tailwind-styled-components';

const CardContainer = tw.div`bg-white shadow-md p-4 m-2 rounded-md w-full md:w-1/4`;
const Title = tw.h4`text-sm font-medium text-gray-600`;
const Value = tw.h3`text-3xl font-bold text-gray-800 mt-2`;
const SubTitle = tw.p`text-xs text-gray-500`;

const StatCards = ({ title, value, date, icon: Icon, iconcolor, color }) => {
    return (
        <CardContainer style={{ backgroundColor: color }}>
            <div className='flex justify-between'>
                <div>
                    <Title>{title}</Title>
                    <div className="text-5xl mt-2 " style={{ color: iconcolor }}>
                        <Icon />
                    </div>

                </div>
                <div className='mt-3'>
                    <Value style={{ color: iconcolor }}>{value}</Value>
                    <SubTitle>{date}</SubTitle>
                </div>
            </div>
        </CardContainer>
    );
};

export default StatCards;
