
import { Label } from 'components/Styles/InputStyles';
import { HeaderTitle } from 'components/Styles/PageStyles';
import React from 'react';
import tw from 'tailwind-styled-components';

const Wrapper = tw.div`text-center`;
const Title = tw.div`text-lg my-6 text-black font-semibold`;
const GaugeWrapper = tw.div`relative w-48 h-24 overflow-hidden mx-auto`;
const Gauge = tw.div`absolute top-0 left-0 w-full h-full transform rotate-[-180deg]`;
const Background = tw.circle`text-gray-200 fill-none stroke-current`;
const Foreground = tw.circle`text-green-500 fill-none stroke-current transition-all duration-500`;
const CenterText = tw.div`absolute inset-0 flex items-center justify-center text-2xl font-bold text-black`;

const SemiCircularProgressBar = ({ percentage, totalCost }) => {
    const radius = 45;
    const circumference = Math.PI * radius;
    const offset = (percentage / 100) * circumference;

    return (
        <Wrapper>
            <Title>Contacts processed</Title>
            <GaugeWrapper>
                <svg className={Gauge} viewBox="0 0 100 50">
                    <Background cx="50" cy="50" r={radius} strokeWidth="10" />
                    <Foreground
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}

                    />
                </svg>
                <CenterText>{percentage.toFixed(1)}%</CenterText>
            </GaugeWrapper>
            <div className="text-base">Processed</div>
            <div className="text-xl font-bold text-gray-700 mt-2">
                Total cost: <span className="text-purple-600">₵{totalCost.toFixed(2)}</span>
            </div>
        </Wrapper>
    );
};

export default SemiCircularProgressBar;
