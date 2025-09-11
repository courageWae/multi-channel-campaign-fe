import React from "react";
import tw from "tailwind-styled-components";

const SummaryContainer = tw.div`bg-white md:w-8/12 p-4 md:h-72 `;
const Title = tw.h2`text-lg font-semibold text-gray-800`;
const Amount = tw.h3`text-3xl font-bold text-gray-900`;
const Sales = tw.p`text-lg text-gray-600`;
const Button = tw.button`mt-5 bg-orange-500 text-white px-4 py-2 rounded text-sm`;

const Summary = ({ totalCampaigns, totalSocialMedia }) => {
  return (
    <SummaryContainer>
      <Title>Dashboard</Title>
      <p className="text-xs text-gray-600">Total Campaigns Created</p>
      <div className="my-5">
        <Amount>{totalCampaigns}</Amount>
        <p className="text-xs text-gray-600">
          Current Month Campaigns (SMS, Email, Voice)
        </p>
      </div>
      <Sales>{totalSocialMedia}</Sales>
      <p className="text-xs text-gray-600">
        Total Social Media Campaigns (Facebook, Instagram)
      </p>
      <Button>Last Month Summary</Button>
    </SummaryContainer>
  );
};

export default Summary;

// src/components/Summary.jsx
// import Config from 'Config';
// import React from 'react';
// import tw from 'tailwind-styled-components';
// import { useSelector } from "react-redux";
// import { Link, useParams, useNavigate } from "react-router-dom";

// const Summary = ({ campaignData }) => {
//     const user = useSelector((state) => state.UserReducer.user);
//     console.log(campaignData);
//     return (
//         <SummaryContainer>
//             <Title>Dashboard</Title>
//             <p className="text-xs text-gray-600">Overview of Latest Month</p>
//             <div className='my-5'>
//                 <Amount>{campaignData.totalCampaigns}</Amount>
//                 <p className="text-xs text-gray-600">Today's Campaign</p>
//             </div>
//             <Sales>{campaignData.totalSocialMedia}</Sales>
//             <p className="text-xs text-gray-600">Today's Post</p>
//             {user.type == Config.UserType.ClientUser && (
//                 <Button>Upgrade Plan</Button>
//             )}
//             {user.type == Config.UserType.SuperAdminUser && (
//                 <Link to={`/plan/list`}>
//                     <Button>See Plan List</Button>
//                 </Link>)}
//         </SummaryContainer>
//     );
// };
// const SummaryContainer = tw.div`bg-white md:w-7/12 p-4 md:h-72 `;
// const Title = tw.h2`text-lg font-semibold text-gray-800`;
// const Amount = tw.h3`text-3xl font-bold text-gray-900`;
// const Sales = tw.p`text-lg text-gray-600`;
// const Button = tw.button`mt-5 bg-orange-500 text-white px-4 py-2 rounded text-sm`;
// export default Summary;
