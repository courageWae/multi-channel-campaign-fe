import React from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";


const EmailContentView = ({ setViewModel, selectedData, }) => {

    return (
        <Model width={"w-11/12 max-w-xl"} setOpenModel={setViewModel} title="Email content Preview" className="text-2xl font-semibold">
            <Wrapper>

                <Box>
                    {(selectedData.email_content) && (
                        <TextBox dangerouslySetInnerHTML={{ __html: selectedData?.email_content }} />)}


                </Box>
            </Wrapper>
        </Model>
    );
};


const AudioPreview = tw.div` p-2  flex justify-center  items-center`;
const AudioContent = tw.div` bg-white rounded-md  p-1 items-center overflow-y-auto`;
const Wrapper = tw.div`mt-2`;
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-center`;
const TextBox = tw.div`bg-gray-200 rounded-xl p-5`
const Box = tw.div`rounded-xl text-gray-800 border border-gray-200 bg-gray-100 px-16 py-10 whitespace-pre-line`;
export default EmailContentView;
