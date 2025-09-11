import React from "react";
import tw from "tailwind-styled-components";
import Images from "../Images";

const NotFoundModel = () => {
    return (
        <Wrapper>
            <Figure>
                <img src={Images.NotFoundImage} alt="error image" />
            </Figure>
            <Title>No Record Found</Title>
        </Wrapper>
    );
};

const Wrapper = tw.div`w-11/12 max-w-3xl mx-auto my-8  flex flex-col  `;
const Title = tw.h2`text-sm md:text-base  text-gray-400 font-normal text-center`;
const Figure = tw.div`w-60 mx-auto mb-4`;

export default NotFoundModel;
