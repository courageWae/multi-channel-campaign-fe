import React from "react";
import tw from "tailwind-styled-components";
import { MdClose } from "react-icons/md";

const Model = ({ width, setOpenModel, title, children }) => {
    const closeModel = () => setOpenModel(false);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) closeModel();
    };

    return (
        <Wrapper onClick={getCurrentTarget}>
            {/* <Backdrop /> */}
            <Box $width={width} style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <div class="float-root pb-12">
                    <p className="float-left text-xl text-pretty">
                        {title}
                    </p>
                    <CrossIcon onClick={closeModel} />
                </div>
                {children}
            </Box>
        </Wrapper>
    );
};


const Wrapper = tw.div`
fixed top-0 higher-z-index right-0 bottom-0 left-0 bg-black/30 backdrop-blur-sm px-3 h-screen flex justify-center items-center  z-10 addCommentModel overflow-y-auto `;

const Backdrop = tw.div`
fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 backdrop-blur-sm`;

// const Box = tw.div`
// ${(p) => (p.$width ? ` bg-white ${p.$width} ` : " bg-white w-11/12 lg:w-3/5")}
// mx-auto h-auto rounded-md px-6 py-10 lg:p-12 relative z-20`;

const Box = tw.div`
${(p) => (p.$width ? ` bg-white ${p.$width} ` : " bg-white w-11/12 lg:w-3/5")}
mx-auto h-auto rounded-2xl px-8 pt-8 pb-8 relative z-20`;

const CrossIcon = tw(MdClose)`
absolute right-5 w-6 h-6 cursor-pointer text-gray-700 float-right`;

export default Model;
