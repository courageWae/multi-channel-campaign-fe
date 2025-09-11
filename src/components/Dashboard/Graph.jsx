import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import tw from 'tailwind-styled-components';

const GraphContainer = tw.div`bg-white md:w-full md:h-72 px-2 py-4`;

const Graph = ({ graphData }) => {
    const keys = Object.keys(graphData || {});

    const firstKey = keys[0];
    const orderedMonths = graphData[firstKey]?.map(item => item.month);

    const colors = [
        '#0064e0',
        '#E4405AFF',
        '#22C55EFF',
        '#E32FEDFF',
    ];

    const datasets = keys.map((key, index) => {
        const data = orderedMonths.map(month => {
            const entry = graphData[key].find(e => e.month === month);
            return entry ? entry.count : 0;
        });

        return {
            label: key.charAt(0).toUpperCase() + key.slice(1),
            data,
            borderColor: colors[index % colors.length],
            fill: false,
        };
    });

    const data = {
        labels: orderedMonths,
        datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <GraphContainer>
            <Line data={data} options={options} />
        </GraphContainer>
    );
};

export default Graph;
