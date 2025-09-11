import React from "react";
import tw from "tailwind-styled-components";
import Images from "../../Images";

const SelectTemplate = () => {
    return (
        <Wrapper>
            <Figure>
                <img src={Images.SelectTemplate} alt="no_template" />
            </Figure>
            <Title>Select an Email Template</Title>
        </Wrapper>
    );
};

const Wrapper = tw.div`w-8/12 max-w-3xl  mx-auto my-8  flex flex-col  `;
const Title = tw.h2`text-sm md:text-base  text-gray-400 font-normal text-center`;
const Figure = tw.div`w-full   mx-auto mb-4`;

export default SelectTemplate;
