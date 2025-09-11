import React from "react";
import tw from "tailwind-styled-components";
import { MdClose } from "react-icons/md";

const Model = ({ width, setOpenModel, title, children }) => {
    const closeModel = () => setOpenModel(false);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModels")) closeModel();
    };

    return (
        <Wrapper onClick={getCurrentTarget}>
            {/* <Backdrop /> */}
            <Box $width={width} style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <div class="float-root">

                    <CrossIcon onClick={closeModel} />
                </div>
                {children}
            </Box>
        </Wrapper>
    );
};


const Wrapper = tw.div`
fixed top-0 higher-z-index right-0 bottom-0 left-0 bg-black/30 backdrop-blur-sm  h-screen flex justify-center items-center  z-10 addCommentModels overflow-y-auto `;

const Backdrop = tw.div`
fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 backdrop-blur-sm`;

// const Box = tw.div`
// ${(p) => (p.$width ? ` bg-white ${p.$width} ` : " bg-white w-11/12 lg:w-3/5")}
// mx-auto h-auto rounded-md px-6 py-10 lg:p-12 relative z-20`;

const Box = tw.div`
${(p) => (p.$width ? ` bg-white ${p.$width} ` : " bg-white w-11/12 lg:w-3/5")}
mx-auto h-auto relative z-20`;

const CrossIcon = tw(MdClose)`
absolute top-0 right-0 w-6 h-6 cursor-pointer text-gray-700 float-right hover:text-red-500 z-10`;

export default Model;
