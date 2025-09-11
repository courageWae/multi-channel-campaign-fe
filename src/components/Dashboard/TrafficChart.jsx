// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import 'chart.js/auto';
// import tw from 'tailwind-styled-components';

// const TrafficContainer = tw.div`bg-white w-full h-96 py-1 px-4 flex flex-col`;
// const Title = tw.h2`text-lg font-semibold text-gray-800 text-left`;
// const ChartContainer = tw.div` flex justify-center my-4 h-64`;
// const LegendContainer = tw.div`flex flex-wrap justify-between w-full gap-y-2`;
// const LegendItem = tw.div`text-center`;

// const TrafficChart = ({ cardData }) => {
//     const labels = cardData?.pie?.map(item => item.name) || [];
//     const count = cardData?.pie?.map(item => item.count) || [];
//     const total = cardData?.pie?.reduce((sum, item) => sum + item.count, 0);

//     const backgroundColor = total === 0
//         ? ['#d1d5db']
//         : ['#f97316', '#22c55e', '#a855f7', '#3b82f6', '#ec4899'];
//     const labelbackgroundColor = ['#f97316', '#22c55e', '#a855f7', '#3b82f6', '#ec4899'];

//     // Ensure data has at least one value for the pie chart to render
//     const data = {
//         labels: total === 0 ? ['No Data'] : labels,

//         datasets: [
//             {
//                 data: total === 0 ? [1] : count,
//                 // backgroundColor: total === 0 ? ['#d1d5db'] : backgroundColor,
//                 backgroundColor: backgroundColor,
//             },
//         ],
//     };

//     // const percentages = total === 0
//     // ? ['0']
//     // : cardData?.pie?.map(item => ((item.count / total) * 100).toFixed(2)) || [];

//     const percentages = cardData?.pie?.map(item => {
//         const percentage = (item.count / total) * 100;
//         return isNaN(percentage) ? '0.00' : percentage.toFixed(2);
//     }) || ['0.00'];

//     const options = {
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//         responsive: true,
//         cutout: '70%',
//         maintainAspectRatio: false,
//     };

//     return (
//         <TrafficContainer>
//             <Title>Campaign</Title>
//             <ChartContainer>
//                 <Doughnut data={data} options={options} />
//             </ChartContainer>
//             <LegendContainer>
//                 {labels.map((label, i) => (
//                     <LegendItem key={i}>
//                         <span className={`block font-semibold ${i >= 2 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`} style={{ color: labelbackgroundColor[i] }}>
//                             {percentages[i]}%
//                         </span>
//                         <span className="block text-xs text-gray-800">{label}</span>
//                     </LegendItem>
//                 ))}

//                 {/* {total === 0 ? (
//                     <LegendItem>
//                         <span className="block font-semibold md:text-xl" style={{ color: '#d1d5db' }}>
//                             0%
//                         </span>
//                         <span className="block text-xs text-gray-800">No Data</span>
//                     </LegendItem>
//                 ) : (
//                     labels.map((label, i) => (
//                         <LegendItem key={i}>
//                             <span className="block font-semibold md:text-xl" style={{ color: backgroundColor[i] }}>
//                                 {percentages[i]}%
//                             </span>
//                             <span className="block text-xs text-gray-800">{label}</span>
//                         </LegendItem>
//                     ))
//                 )} */}
//             </LegendContainer>
//         </TrafficContainer>
//     );
// };

// export default TrafficChart;

import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import tw from "tailwind-styled-components";

const TrafficContainer = tw.div`bg-white w-full h-96 py-1 px-4 flex flex-col`;
const Title = tw.h2`text-lg font-semibold text-gray-800 text-left`;
const ChartContainer = tw.div` flex justify-center mt-2 h-72`;
const LegendContainer = tw.div`flex  justify-around w-full`;
const LegendItem = tw.div`text-center`;

const TrafficChart = ({ pieData }) => {
  const defaultData = [1];

  const transformedData = Object.keys(pieData).map((key) => ({
        name: key,
        count: pieData[key].count || 0,
      }))

  const labels = transformedData.map((item) => item.name);
  const count = transformedData.map((item) => item.count);
  const allZero = count.every((item) => item === 0);
  const placeholderData = allZero
    ? {
        labels: ["No Campaigns Yet"],
        datasets: [
          {
            data: defaultData,
            backgroundColor: ["#F5F5F5FF"],
          },
        ],
      }
    : {
        labels: labels,
        datasets: [
          {
            data: count,
            backgroundColor: ["#f97316", "#22c55e", "#a855f7"],
          },
        ],
      };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    cutout: "70%",
    maintainAspectRatio: false,
  };

  return (
    <TrafficContainer>
      <Title>Campaigns Overview</Title>
      <ChartContainer>
        <Doughnut data={placeholderData} options={options} />
      </ChartContainer>
      <LegendContainer>
        {placeholderData.labels && placeholderData.labels.map((label, i) => (
          <LegendItem key={i}>
            <span
              className="block font-semibold md:text-xl"
              style={{ color: placeholderData.datasets[0].backgroundColor[i] }}
            >
              {placeholderData.datasets[0].data[i]}
            </span>
            <span className="block text-xs text-gray-800">{label}</span>
          </LegendItem>
        ))}
      </LegendContainer>
    </TrafficContainer>
  );
};

export default TrafficChart;
