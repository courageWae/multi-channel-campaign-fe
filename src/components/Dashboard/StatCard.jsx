import React from 'react';
import tw from 'tailwind-styled-components';

const CardContainer = tw.div`bg-white p-4 h-24 md:w-1/2 lg:w-1/4 md:flex items-center justify-center`;

const Title = tw.h4`text-sm font-medium text-gray-600`;
const Value = tw.h3`text-md font-bold text-gray-800 font-semibold`;
const IconWrapper = tw.div`px-3 py-3 mr-4 rounded-full flex items-center justify-center`;

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <CardContainer>
            <div className="flex justify-center">
                <IconWrapper
                    style={{
                        background: color,
                    }}
                >
                    <Icon className="w-10 h-10 text-white" />
                </IconWrapper>
                <div>
                    <Title>{title}</Title>
                    <Value>{value}</Value>
                </div>
            </div>
        </CardContainer>
    );
};

export default StatCard;
