import React from "react";
import tw from "tailwind-styled-components";
import Images from "../../Images";
import Model from "../Model";
import moment from "moment";
import ReactAudioPlayer from "react-audio-player";

const ViewModel = ({ setViewModel, selectedData, message, audioFile }) => {
    console.log(audioFile)
    return (
        <Model width={"w-11/12 max-w-xl"} setOpenModel={setViewModel} title="Message Preview" className="text-2xl font-semibold">
            <Wrapper>
                {/* <Title>{selectedData?.name}</Title> */}
                <Box>
                    {(selectedData.message || message) && (
                        <TextBox>{selectedData?.message || message}</TextBox>)}
                    {/* {(message) && (
                        <TextBox>{message}</TextBox>)} */}
                    {(selectedData.voice || audioFile) && (
                        <AudioPreview>

                            <AudioContent>
                                <ReactAudioPlayer
                                    // src={URL.createObjectURL(audioFile)}
                                    src={selectedData.voice instanceof File ? URL.createObjectURL(selectedData.voice) : selectedData.voice}

                                    controls
                                />
                            </AudioContent>

                        </AudioPreview>
                    )}
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
export default ViewModel;
